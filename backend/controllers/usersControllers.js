import Users from "../models/UsersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import multer from "multer"
import { fileTypeFromFile } from "file-type"

export const getUsers = async (req, res) =>
{
    try
    {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'image_profile', 'bio']
        });
        res.json(users)
    } catch (error)
    {
        console.log(error)
    }
}

export const getDashbordUsers = async (req, res) =>
{
    const query = req.query.name;

    try
    {
        const users = await Users.findOne({ attributes: ["id", "name", "email", "image_profile", "bio"], where: { name: query } })
        res.json({ succes: true, data: users })
    } catch (error)
    {
        res.status(404).send({ succes: false, msg: "data tidak ditemukan" })
    }
}

export async function verifyUser(req, res, next)
{
    try
    {

        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await Users.findOne({ where: username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();

    } catch (error)
    {
        return res.status(404).send({ error: "Authentication Error" });
    }
}


export const registerUsers = async (req, res) =>
{
    const { name, email, password, confPassword, pin } = req.body;
    // Users Validasi
    if (!name || !email || !password || !confPassword || !pin) return res.status(400).json({ succes: false, msg: "Tolong Isi Yang Benar Tidak boleh ada yang kosong" })
    if (password !== confPassword) return res.status(400).json({ succes: false, msg: "Password dan confirm Password Tidak Sama" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const hashPin = await bcrypt.hash(pin, salt);
    const image_profile = "  "
    const bio = "Not Bio Nyet";
    try
    {
        // Chek user in db
        const existingUser = await Users.findOne({ where: { name: name } });
        if (existingUser)
        {
            return res.status(400).json({ succes: false, msg: "UserName dan email Sudah Ada Mohon Cari Nama Yang Lain" })
        }
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            pin: hashPin,
            image_profile: image_profile,
            image: image_profile,
            bio: bio
        });
        res.json({ succes: true, msg: "Register Berhasil Ditambahkan" })
    } catch (error)
    {
        res.status(500).json({ succes: false, msg: "data Tidak Berhasil DiTambahkan" })
    }
}


export const LoginUsers = async (req, res) =>
{
    try
    {
        const existingUser = await Users.findOne({ where: { name: req.body.name } });
        if (!existingUser)
        {
            return res.status(400).send({ succes: false, msg: "userName dan Email Tidak Ada mohon register dulu Ya" })
        }
        const user = await Users.findAll({
            where: {
                name: req.body.name,
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password)
        const pinmatch = await bcrypt.compare(req.body.pin, user[0].pin)
        if (!match || !pinmatch) return res.status(400).json({ succes: false, msg: "pin atau password Tidak Sama" })
        const userId = user[0].id;
        const name = user[0].name;
        const accesstToken = jwt.sign({ userId, name }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "60s"
        });
        const refreshToken = jwt.sign({ userId, name }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        })
        await Users.update({ refersh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie("token", refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 1 * 60 * 60 * 1000,
        })
        res.status(200).send({
            succes: true,
            msg: "Login Berhasil",
            data: { accesstToken }
        })

    } catch (error)
    {
        res.status(404).json({ succes: false, msg: "name atau email Tidak Di Temukan" })
    }
}


export const ForgotPassword = async (req, res) =>
{
    const { name, email, newPassword, newConfPassword } = req.body;
    if (!name || !email || !newPassword || !newConfPassword) return res.status(400).json({ succes: false, msg: "Tolong Isi Yang Benar Tidak boleh ada yang kosong" })
    if (newPassword !== newConfPassword) return res.status(400).json({ succes: false, msg: "Password dan confirm Password Tidak Sama" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    try
    {
        const users = await Users.findOne({ where: { name: name, email: email } })
        if (!users) return res.status(400).send({ succes: false, msg: "name atau email Tidak ditemukan" })

        const _id = users.id;

        await Users.update({ password: hashPassword }, { where: { id: _id } })
        res.json({ succes: true, msg: "data Berhasil TerUpdate" })
    } catch (error)
    {
        res.status(500).send({ succes: false, msg: "data tidak ditemukan" })
    }
}

export const LogoutUsers = async (req, res) =>
{
    const refreshToken = req.cookies.token
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refersh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refersh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('token');
    return res.sendStatus(200);
}


export const EditProfile = async (req, res) =>
{
    const _id = req.body._id;
    const name = req.body.name;
    const bio_update = req.body.bio;
    if (!_id || !bio_update) return res.status(400).send({
        succes: false,
        msg: "data error"
    })

    try
    {
        const data = await Users.update({ name: name, bio: bio_update }, { where: { id: _id } })
        res.status(200).send({
            succes: true,
            msg: "data Berhasil Terupload",
            data: { r: data }
        })
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "data gagal Terupload",
            error: error
        })
    }
}

export const UsersUpdate = async (req, res) =>
{
    const _id = await Users.findOne({
        where: {
            id: req.body.id
        }
    })
    if (!_id) return res.status(404).send({ succes: false, msg: "data Not Found" })

    let fileName = "";
    if (req.filrs === null)
    {
        fileName = _id.image;
    } else
    {
        const img_update = req.files.file
        const fileSize = img_update.data.length;
        const ext = Path.extname(img_update.name);
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        fileName = file.md5 + ext;
        const allowType = [".jpg", ".png", ".jpeg"];

        if (!allowType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        file
    }
}



export const UpdateImg = async (req, res) =>
{
    const name = req.query.name;
    if (!name) return res.sendStatus(500);
    const _id = await Users.findOne({
        where: {
            name: name
        }
    })
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/photoProfile/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./uploads/photoProfile/${fileName}`, async (err) =>
    {
        if (err) return res.status(500).json({ msg: err.message });
        try
        {
            await Users.update({ image_profile: url, image: fileName }, { where: { id: _id.id } });
            res.status(201).json({ msg: "Product Created Successfuly" });
        } catch (error)
        {
            console.log(error.message);
        }
    })

}
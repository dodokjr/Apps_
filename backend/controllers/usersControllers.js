import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import multer from "multer"
import { fileTypeFromFile } from "file-type"
import { GetUsers, userLogin, usersCreate, usersFindAll, usersFindOne } from "../utilities/helper.js"

export const getUsers = async (req, res) =>
{
    const user = await GetUsers()
    if (user)
    {
        res.status(200).send({
            succes: true,
            msg: user
        })
    } else
    {
        res.status(400).send({
            succes: false,
            msg: "error"
        })
    }
}

export const getSearchUsers = async (req, res) =>
{
    const name = req.query.name
    try
    {
        const r = await Users.findOne(
            { where: { name: name } }
        )
        res.status(200).send({
            succes: true,
            msg: r
        })
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: error
        })
    }
}

export const getDashbordUsers = async (req, res) =>
{
    const query = req.query.name;

    try
    {
        const users = await Users.findOne({ attributes: ["userId", "name", "email", "image_profile", "bio"], where: { name: query } })
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
        const existingUser = await usersFindOne(name)
        if (existingUser)
        {
            return res.status(400).json({ succes: false, msg: "UserName dan email Sudah Ada Mohon Cari Nama Yang Lain" })
        }
        await usersCreate(name, email, hashPassword, hashPin, image_profile, bio)
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
        const existingUser = await usersFindOne(req.body.name)
        if (!existingUser)
        {
            return res.status(400).send({ succes: false, msg: "userName dan Email Tidak Ada mohon register dulu Ya" })
        }
        const user = await usersFindAll(req.body.name)
        const match = await bcrypt.compare(req.body.password, user[0].password)
        const pinmatch = await bcrypt.compare(req.body.pin, user[0].pin)
        if (!match || !pinmatch) return res.status(400).json({ succes: false, msg: "pin atau password Tidak Sama" })
        const userId = user[0].userId;
        const name = user[0].name;
        const accesstToken = jwt.sign({ userId, name }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "60s"
        });
        const refreshToken = jwt.sign({ userId, name }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        })
        await Users.update({ refersh_token: refreshToken }, { where: { userId: userId } })
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
        res.status(500).json({ succes: false, msg: "error", err: error })
    }
}


export const ForgotPassword = async (req, res) =>
{
    const { name, newPassword, newConfPassword } = req.body;
    if (!name || !newPassword || !newConfPassword) return res.status(400).json({ succes: false, msg: "Tolong Isi Yang Benar Tidak boleh ada yang kosong" })
    if (newPassword !== newConfPassword) return res.status(400).json({ succes: false, msg: "Password dan confirm Password Tidak Sama" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    try
    {
        const users = await usersFindOne(name)
        if (!users) return res.status(400).send({ succes: false, msg: "name atau email Tidak ditemukan" })

        const _id = users.userId;

        await Users.update({ password: hashPassword }, { where: { userId: _id } })
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
    const userId = user[0].userId;
    await Users.update({ refersh_token: null }, {
        where: {
            userId: userId
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


export const SaveImage = async (req, res) =>
{
    const name = req.body.name;
    if (!name) return res.sendStatus(500);
    const _id = await Users.findOne({
        where: {
            name: name
        }
    });
    if (!_id)
    {
        return res.status(400).send({ succes: false, msg: "userName Tidak Ada" })
    }
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/photoProfile/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.jfif', '.gif'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 500000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./uploads/photoProfile/${fileName}`, async (err) =>
    {
        if (err) return res.status(500).json({ msg: err.message });
        try
        {
            const user = await usersFindAll(req.body.name)
            const userId = user[0].userId;
            const name = user[0].name;
            const accesstToken = jwt.sign({ userId, name }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "60s"
            });
            const refreshToken = jwt.sign({ userId, name }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "1d"
            });
            // Update PRofile
            await Users.update({ image_profile: url, image: fileName }, { where: { userId: _id.userId } });
            await Users.update({ refersh_token: refreshToken }, { where: { userId: userId } })
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
            res.status(200).json({ succes: true, msg: "Successfuly" });
        } catch (error)
        {
            console.log(error.message);
        }
    })
}
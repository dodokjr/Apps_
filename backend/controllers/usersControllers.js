import Users from "../models/usersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { QueryTypes } from "sequelize";

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
        const users = await Users.findOne({ where: { name: query } })
        res.json({ data: users })
    } catch (error)
    {
        console.log(error)
    }
}



export const registerUsers = async (req, res) =>
{
    const { name, email, password, confPassword, pin } = req.body;
    if (!name || !email || !password || !confPassword || !pin) return res.status(400).json({ succes: false, msg: "Tolong Isi Yang Benar Tidak boleh ada yang kosong" })
    if (password !== confPassword) return res.status(400).json({ succes: false, msg: "Password dan confirm Password Tidak Sama" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const hashPin = await bcrypt.hash(pin, salt);
    const image_profile = "https://i.pinimg.com/170x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg"
    const bio = "Not Bio Nyet";
    try
    {
        // Chek user in db
        const existingUser = await Users.findOne({ where: { name: name } });
        if (existingUser)
        {
            return res.status(400).json({ succes: false, msg: "UserName Sudah Ada Mohon Cari Nama Yang Lain" })
        }
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            pin: hashPin,
            image_profile: image_profile,
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
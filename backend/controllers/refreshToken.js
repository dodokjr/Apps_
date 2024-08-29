import Users from "../models/UsersModel.js";
import jwt from "jsonwebtoken"

export const refreshToken = async (req, res) =>
{
    try
    {
        const refreshToken = req.cookies.token
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                refersh_token: refreshToken
            }
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) =>
        {
            if (err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const image_profile = user[0].image_profile
            const accesstToken = jwt.sign({ userId, name, email, image_profile }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ succes: true, data: { accesstToken } })
        })
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: error
        })
    }
}
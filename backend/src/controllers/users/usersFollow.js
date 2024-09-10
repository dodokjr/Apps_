import expres from "express";
import Users from "../../models/usersModel.js";
import dbApps from "../../config/db.js";
import Followed from "../../models/usersFollowed.js";


export const setFollowed = async (req, res) =>
{
    const name = req.query.name;
    if (!name)
    {
        return res.status(400).send({
            succes: false,
            msg: "Tidak Ada name , PostId, Content",
            err: [err]
        })
    }
    try
    {
        const userId = await Users.findOne({ where: { name: name } })
        if (!userId) return res.sendStatus(422)
        const followed = await Followed.create({ userId: userId.userId, isFollow: true })
        res.status(200).send({
            succes: true,
            msg: followed
        })
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Server",
            err: error.message
        })
    }
}

// get Comment
export const setGetFollowed = async (req, res) =>
{
    const userId = req.params.id;
    if (!userId) return res.sendStatus(400);
    try
    {
        const post = await Users.findOne({ where: { userId: userId } })
        const comment = await Followed.findAndCountAll({ where: { userId: userId }, include: [{ model: Users, foreignKey: "userId", attributes: ["userId", "name", "image_profile", "bio", "email"] }] })
        console.log(comment)
        res.status(200).send({
            succes: true,
            msg: comment
        })
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Server",
            err: error.message
        })
    }
}
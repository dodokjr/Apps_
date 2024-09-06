import expres from "express";
import Users from "../../models/usersModel.js";
import usersPost from "../../models/usersPostModels.js";
import dbApps from "../../config/db.js";
import usersComment from "../../models/usersCommentModels.js";


export const setComment = async (req, res) =>
{
    const postId = req.params.postId;
    const userId = req.query.userId;
    const content = req.query.c;
    if (!postId || !userId || !content)
    {
        return res.status(400).send({
            succes: false,
            msg: "Tidak ADa UserId , PostId, Content",
            err: [err]
        })
    }
    try
    {
        const user = await usersPost.findOne({ where: { postId: postId } })
        console.log(user)
        if (!user) return res.sendStatus(422)
        const users = await usersPost.findByPk(postId, { include: [{ model: Users, foreignKey: "userId" }] })
        console.log(users.dataValues)
        const comment = await usersComment.create({ postId: postId, userId: userId, Content: content })
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

export const setGetComment = async (req, res) =>
{
    const postId = req.params.id;
    console.log(postId)
    if (!postId) return res.sendStatus(400);
    try
    {
        const post = await usersPost.findOne({ where: { postId: postId } })
        const comment = await usersComment.findAndCountAll({ attributes: ["userId", "postId", "Content", "commentId"], where: { postId: postId }, include: [{ model: Users, foreignKey: "userId", attributes: ["userId", "name", "image_profile"] }] })
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
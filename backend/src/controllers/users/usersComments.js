import expres from "express";
import Users from "../../models/usersModel.js";
import usersPost from "../../models/usersPostModels.js";
import dbApps from "../../config/db.js";
import usersComment from "../../models/usersCommentModels.js";


export const setComment = async (req, res) =>
{
    const postId = req.body.postId;
    const userId = req.body.userId;
    const content = req.body.c;
    if (!postId || !content) return res.sendStatus(400)
    try
    {
        const user = await usersPost.findOne({ where: { postId: postId } })
        const profile = await Users.findOne({ where: { userId: userId } })
        if (!user) return res.sendStatus(422)
        const comment = await usersComment.create({ postId: user.postId, userId: userId, Content: content, name: profile.name })
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
        const comment = await usersComment.findAndCountAll({ attributes: ["commentId", "userId", "postId", "Content"], where: { postId: postId }, include: [{ model: Users, as: "name" }] })
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
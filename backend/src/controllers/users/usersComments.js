import expres from "express";
import Users from "../../models/usersModel.js";
import usersPost from "../../models/usersPostModels.js";
import dbApps from "../../config/db.js";
import usersComment from "../../models/usersCommentModels.js";


export const setComment = async (req, res) =>
{
    const postId = req.params.postId;
    const name = req.query.name;
    const content = req.query.c;
    if (!postId || !name || !content)
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
        const user = await usersPost.findOne({ where: { postId: postId } })
        console.log(user)
        if (!user) return res.sendStatus(422)
        const comment = await usersComment.create({ postId: postId, userId: userId.userId, Content: content })
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

// get Comment
export const setGetComment = async (req, res) =>
{
    const postId = req.params.id;
    console.log(postId)
    if (!postId) return res.sendStatus(400);
    try
    {
        const post = await usersPost.findOne({ where: { postId: postId } })
        const comment = await usersComment.findAndCountAll({ where: { postId: postId }, include: [{ model: Users, foreignKey: "userId", attributes: ["userId", "name", "image_profile", "bio", "email"] }] })
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
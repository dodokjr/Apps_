import expres from "express";
import Users from "../../models/usersModel.js";
import usersPost from "../../models/usersPostModels.js";
import dbApps from "../../config/db.js";
import usersComment from "../../models/usersCommentModels.js";
import LikePost from "../../models/usersLikePost.js";


export const setLike = async (req, res) =>
{
    const postId = req.params.postId;
    const name = req.query.name;
    if (!postId || !name)
    {
        return res.status(400).send({
            succes: false,
            msg: "Tidak Ada name , PostId, Content",
            err: "!!!!"
        })
    }
    try
    {
        const userId = await Users.findOne({ where: { name: name } })
        const user = await usersPost.findOne({ where: { postId: postId } })
        if (!user) return res.sendStatus(422)
        if (!userId) return res.sendStatus(422)
        console.log(userId.userId)
        const like = await LikePost.findOne({ where: { postId: postId } })
        if (!like !== userId) 
        {
            const comment = await LikePost.create({ postId: postId, userId: userId.userId, isLike: true })
            return res.status(200).send({
                succes: true,
                msg: comment
            })
        }

        if (like.isLike == true)
        {
            const like = await LikePost.destroy({ where: { postId: postId, userId: userId.userId } })
            if (!like) return res.status(400), send({ succes: false, msg: "error" })
            res.status(200).send({
                succes: true,
                msg: like
            })
        }
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Server",
            err: error.message
        })
    }
}


export const setLikeUpdate = async (req, res) =>
{
    const postId = req.params.postId;
    const name = req.query.name;
    if (!postId || !name)
    {
        return res.status(400).send({
            succes: false,
            msg: "Tidak Ada name , PostId, Content",
            err: "!!!!"
        })
    }
    try
    {
        const userId = await Users.findOne({ where: { name: name } })
        const user = await usersPost.findOne({ where: { postId: postId } })
        if (!user) return res.sendStatus(422)

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
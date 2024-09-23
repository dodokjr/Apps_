
import expres from "express";
import Users from "../../models/usersModel.js";
import usersPost from "../../models/usersPostModels.js";
import dbApps from "../../config/db.js";
import path from "path"
import fs from "fs-extra"
import usersComment from "../../models/usersCommentModels.js";
import LikePost from "../../models/usersLikePost.js";

// Post
export const setUserPost = async (req, res) =>
{
    const t = await dbApps.transaction();
    const name = req.body.name;
    const caption = req.body.c;
    const userId = req.body.u;
    if (!name) return res.sendStatus(400);
    const user = await Users.findOne({ where: { name: name } })
    if (!user) return res.sendStatus(422);
    // file
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/wdpost/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.jfif', '.gif', '.mp4'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./uploads/wdPost/${fileName}`, async (err) =>
    {
        if (err) return res.status(500).json({ msg: err.message });
        try
        {
            // create Post
            const r = await usersPost.create({ userId: userId, ContentUrl: url, ContentLocal: fileName, Caption: caption });
            if (r)
            {
                return res.status(200).json({ succes: true, msg: "Successfuly" });
            } else
            {
                return res.status(400).json({ succes: false, msg: "error create" })
            }
        } catch (error)
        {
            res.status(500).send({
                succes: false,
                msg: "Internal Server Error",
                err: error.message
            });
        }
    })
}

// Get Users
export const getUsersPost = async (req, res) =>
{
    const name = req.params.name
    if (!name) return res.sendStatus(402)
    const userId = await Users.findOne({
        where: { name: name }
    })
    if (!userId)
    {
        return res.status(402).send({
            succes: false,
            msg: "UserId Not Found"
        })
    }
    try
    {
        const getData = await usersPost.findAll({ where: { userId: userId.userId } })
        if (!getData)
        {
            return res.status(402).send({
                succes: false,
                msg: "Not data please Upload Your data"
            })
        } else
        {
            return res.status(200).send({
                succes: true,
                msg: "Happy Your Data",
                data: getData
            })
        }
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Server Errror",
            err: error.message
        })
    }
}

// Get Users By id
export const getPostById = async (req, res) =>
{
    const postId = req.params.id;
    try
    {
        const r = await usersPost.findOne({
            where: { postId: postId },
            include: [{ model: Users }, { model: LikePost }]
        })
        const c = await usersComment.findAndCountAll({ where: { postId: postId }, include: [{ model: Users, foreignKey: "userId", attributes: ["userId", "name", "image_profile", "bio", "email"] }] })


        if (!c || !r)
        {
            return res.status(400).send({
                succes: false,
                msg: "Error"
            })
        }
        res.status(200).send({
            succes: true,
            msg: "Data Berhasil Di dapat",
            data: { r, c }
        })
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Server Error",
            err: error.message
        })
    }
}

// Update Post
export const updatePost = async (req, res) =>
{
    const postId = req.body.postId
    const userId = req.body.u;
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const file = req.files.file;
    if (!file) return res.status(400).json({ msg: "No File Uploaded" });
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/wdpost/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.jfif', '.gif', '.mp4'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./uploads/wdPost/${fileName}`, async (err) =>
    {
        if (err) return res.status(500).json({ msg: err.message });
        try
        {
            // update Post
            const r = await usersPost.update({ ContentUrl: url, ContentLocal: fileName }, { where: { postId: postId, userId: userId } });
            if (r)
            {
                return res.status(200).json({ succes: true, msg: "Successfuly" });
            } else
            {
                return res.status(400).json({ succes: false, msg: "error create" })
            }
        } catch (error)
        {
            res.status(500).send({
                succes: false,
                msg: "Internal Server Error",
                err: error.message
            });
        }
    })
}

// Delete Post 
export const deletePost = async (req, res) =>
{
    const postId = req.params.postId
    try
    {
        const pd = await usersPost.findOne({ where: { postId: postId } })
        const destoryFile = fs.remove(`./uploads/wdpost/${pd.ContentLocal}`)
        if (destoryFile)
        {
            // delete Post
            const d = await usersPost.destroy({ where: { postId: postId } })
            if (d)
            {
                return res.status(201).send({
                    succes: true,
                    postId: postId,
                    data: d
                })
            } else
            {
                return res.status(400).send({
                    succes: false,
                    postId: postId,
                    data: d
                })
            }
        } else
        {
            return res.status(400), send({
                succes: false,
                data: null,
            })
        }
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Server Error",
            err: error.message
        });
    }
}
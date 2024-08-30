import { where } from "sequelize";
import { UsersPost } from "../../models/Models.js"
import Users from "../../models/UsersModel.js";
import path from "path"

export const GetPost = async (req, res) =>
{
    const id = req.body.id;

    try
    {
        const r_ = await UsersPost.findOne({
            attributes: ["postId", "Caption", "image_url", "post_date"]
        }, { where: { userId: id } })
        res.status(200).send({
            succes: true,
            userId: id,
            msg: r_
        })
    } catch (error)
    {
        res.status(400).send({
            succes: false,
            msg: error
        })
    }
}



export const UploadOne = async (req, res) =>
{
    const name = req.body.name;
    const Caption = req.body.Caption;
    const date = Date.now()
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
    const url = `${req.protocol}://${req.get("host")}/users/post_image/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.jfif', '.gif'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 50000000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./uploads/users/post_image/${fileName}`, async (err) =>
    {
        if (err) return res.status(500).json({ msg: err.message });
        try
        {
            await UsersPost.create({ image_url: url, user_id: _id.userId, Caption: Caption, post_date: date });
            res.status(200).json({ succes: true, msg: "Successfuly" });
        } catch (error)
        {
            console.log(error.message);
        }
    })
}
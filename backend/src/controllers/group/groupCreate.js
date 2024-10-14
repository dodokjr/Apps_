import GroupsMembers from "../../models/groups/groups.js";
import GroupsCreate from "../../models/groups/groupsCreate.js";
import GroupsPost from "../../models/groups/postGroup.js";
import Users from "../../models/usersModel.js";
import path from "path"

// create Group
export const createGroups = async (req, res) =>
{
    const userId = req.body.userId
    const name = req.body.name
    const Private = req.body.private
    const nameGroup = req.body.nameg
    const desc = req.body.desc
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const photoGroup = req.files.pp
    if (!Private || Private !== "false" && Private !== "true")
    {
        return res.status(400).send({
            succes: false,
            msg: "Private Tidak Valid"
        })
    }
    if (!userId || !nameGroup)
    {
        return res.status(400).send({
            succes: false,
            msg: "data kosong mohon di isi"
        })
    }
    const fileSize = photoGroup.data.length;
    const ext = path.extname(photoGroup.name);
    const fileName = Date.now() + photoGroup.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/photoProfile/group/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.jfif', '.gif'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    photoGroup.mv(`./uploads/photoProfile/group/${fileName}`, async (err) =>
    {
        if (err) return res.status(500).json({ msg: err.message });
        try
        {
            const r = await GroupsCreate.create({ userId: userId, OwnerGrup: name, isPrivate: Private, isSign: true, nameGroup: nameGroup, photoGroup: url, filePhotoGroup: fileName, descriptionGroup: desc, amountGroup: 10 })
            if (r)
            {
                const sign = await GroupsMembers.create({ GroupId: r.GroupId, userId: r.userId, role: "Admin" })
                if (sign)
                {
                    return res.status(201).send({
                        succes: true,
                        msg: `Group Berhasil Dibuat oleh ${name}`,
                        data: {
                            r, sign
                        }
                    })
                } else
                {
                    return res.status(400).send({
                        succes: false,
                        msg: `Group Gagal Dibuat Oleh ${name}`,
                        data: { r, sign }
                    })
                }
            } else
            {
                return res.status(400).send({
                    succes: false,
                    msg: "Data Gagal memuat"
                })
            }
        } catch (error)
        {
            res.status(500).send({
                succes: false,
                msg: "Internal Server Error",
                err: error.message
            })
        }
    })
}

// Join Group
export const joinGroup = async (req, res) =>
{
    const name = req.body.name
    const userId = req.body.userId
    const groupId = req.body.groupId
    if (!name || !userId || !groupId)
    {
        return res.status(400).send({
            succes: false,
            msg: "Data Tidak Boleh Kosong!!"
        })
    }
    const users = await GroupsMembers.findOne({ where: { GroupId: groupId } })
    if (userId == users.userId)
    {
        return res.status(400).send({
            succes: false,
            msg: "Anda Sudah Bergabung di Group Ini"
        })
    }

    const groups = await GroupsCreate.findOne({ where: { GroupId: groupId } })
    if (!groups)
    {
        return res.status(400).send({
            succes: false,
            msg: "Groups Tidak Ada"
        })
    }

    try
    {
        if (groups.isPrivate == false)
        {
            const r = await GroupsMembers.create({ GroupId: groupId, userId: userId, role: "members" })
            if (r)
            {
                return res.status(201).send({
                    succes: true,
                    msg: `anda telah ditambahkan di${groups.nameGroup}`,
                    data: r
                })
            } else
            {
                return res.status(400).send({
                    succes: false,
                    msg: `anda gagal ditambahkan di${groups.nameGroup}`
                })
            }
        } else
        {
            return res.status(302).send({
                succes: false,
                msg: "diTunggu oleh ouner"
            })
        }
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Server Error",
            err: error.message
        })
    }
}

// Post Group
export const postGroupImage = async (req, res) =>
{
    const mmbId = req.body.memberGroupId
    const grId = req.body.GroupId
    const userId = req.body.userId
    const cT = req.body.contentText

    if (!mmbId || !grId || !userId)
    {
        return res.status(400).send({
            succes: false,
            msg: "MemberId atau GroupId atau UserId kosong",
            data: { mmbId, grId, userId }
        })
    }
    if (!req.files.post === null)
    {
        return res.status(404).send({
            succes: false,
            msg: "gambar kosong"
        })
    }
    // tidak ada content Text
    else
    {
        const post = req.files.post
        const fileSize = post.data.length;
        const ext = path.extname(post.name);
        const fileName = Date.now() + post.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/wdPost/group/${fileName}`;
        const allowedType = ['.png', '.jpg', '.jpeg', '.jfif', '.gif'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        post.mv(`./uploads/wdPost/group/${fileName}`, async (err) =>
        {
            if (err) return res.status(500).send({ succes: false, msg: "error!!!", err: err.message })

            try
            {
                const role = await GroupsMembers.findOne({ where: { memberGroupId: mmbId } })
                const r = await GroupsPost.create({ memberGroupId: mmbId, GroupId: grId, userId: userId, contentImage: url, contentSaveImage: fileName, contentText: cT, role: role.role })
                if (r)
                {
                    return res.status(201).send({
                        succes: true,
                        msg: "content Berhasil Ditambahkan",
                        data: r
                    })
                } else
                {
                    return res.status(400).send({
                        succes: false,
                        msg: "data tidak Ditemukan atau error!",
                        data: r
                    })
                }
            } catch (error)
            {
                res.status(500).send({
                    succes: false,
                    msg: "Error !!!",
                    err_: error.message
                })
            }
        })
    }
}

export const postGroupText = async (req, res) =>
{
    const mmbId = req.body.memberGroupId
    const grId = req.body.GroupId
    const userId = req.body.userId
    const cT = req.body.contentText

    if (!cT)
    {
        return res.status(400).send({
            succes: false,
            msg: "tidak ada content Yang Terupload"
        })
    } else
    {
        try
        {
            const role = await GroupsMembers.findOne({ where: { memberGroupId: mmbId } })
            const r = await GroupsPost.create({ memberGroupId: mmbId, GroupId: grId, userId: userId, contentImage: "https://i.pinimg.com/enabled_lo/564x/2d/67/f9/2d67f9834649b584682ab58606f5a27e.jpg", contentSaveImage: "i.pinimg.com", contentText: cT, role: role.role })
            if (r)
            {
                return res.status(201).send({
                    succes: true,
                    msg: "content Berhasil Ditambahkan",
                    data: r
                })
            } else
            {
                return res.status(400).send({
                    succes: false,
                    msg: "content Tidak Titemukan atau error",
                    data: r
                })
            }
        } catch (error)
        {
            res.status(500).send({
                succes: false,
                msg: "Internal Server Error",
                err: error.message
            })
        }
    }
}

// Get Group
export const getGroupAll = async (req, res) =>
{
    try
    {
        const r = await GroupsCreate.findAndCountAll({ include: [{ model: Users, foreignKey: "userId", attributes: ["userId", "name", "image_profile", "bio", "email", "is_login"] }] })
        if (r)
        {
            return res.status(200).send({
                succes: true,
                msg: "berhasil didapat",
                data: r
            })
        } else
        {
            return res.status(400).send({
                succes: false,
                msg: "error!",
                data: r
            })
        }
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "error!",
            err: error.message
        })
    }
}
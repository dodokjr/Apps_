import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Users from "../models/UsersModel.js";


export const usersFindOne = async (name) =>
{
    try
    {
        const findOne = await Users.findOne({
            where: { name: name }
        })

        return findOne;
    } catch (error)
    {
        return error
    }
}

export const usersFindAll = async (name) =>
{
    try
    {
        const findAll = await Users.findAll({
            where: { name: name }
        })
        return findAll
    } catch (error)
    {
        return error
    }
}

export const GetUsers = async () =>
{
    try
    {
        const users = await Users.findAll({
            attributes: ["userId", "name", "email", "image_profile", "image"]
        })
        return users;
    } catch (error)
    {
        return error
    }
}


export const usersCreate = async (name, email, hashPassword, hashPin, image_profile, bio) =>
{
    try
    {
        const create = await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            image_profile: image_profile,
            image: image_profile,
            bio: bio,
            pin: hashPin,
        })
        return create;
    } catch (error)
    {
        console.log(error)
    }
}

export const userLogin = async (userId, refersh_token) =>
{
    try
    {
        const Login = await Users.update({ refersh_token: refersh_token }, { where: { userId: userId } })
        return Login;
    } catch (error)
    {
        return error;
    }
}




export const SaveImage = () =>
{
    const img_update = file
    const fileSize = img_update.data.length;
    const ext = Path.extname(img_update.name);
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const fileName = file.md5 + ext;
    const allowType = [".jpg", ".png", ".jpeg"];

    if (!allowType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

}
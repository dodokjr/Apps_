import Users from "../../models/usersModel.js";
import dbApps from "../../config/db.js";
import { sendforgot, sendMail, sendPassword, sendSucces } from "../../utilities/sendMails.js";
import { Op } from "sequelize";
import { compare } from "../../utilities/brcryp.js";
import
{
    generateAccessToken,
    generateRefreshToken,
    parseJwt,
    verifyRefreshToken,
} from "../../utilities/jwt.js";
import path from "path"
import fs from "fs"
import { fileTypeFromFile } from "file-type"
import { dataValid } from "../../validation/dataValidation.js";
import { Entropy, charset32 } from "entropy-string";
import { isExists } from "../../validation/sanitization.js";
import usersPost from "../../models/usersPostModels.js";
import usersComment from "../../models/usersCommentModels.js";

// getUsers
export const getUser = async (req, res) =>
{
    const users = await Users.findAll({});
    res.json(users);
};

// getUsers Profile
export const getUserProfile = async (req, res) =>
{
    const name = req.params.name
    try
    {
        const users = await Users.findOne({
            attributes: ["userId", "email", "name", "image_profile", "bio", "isLogin"], where: {
                name: name,
                isActive: true,
            }
        });
        const post = await usersPost.findAndCountAll({ where: { userId: users.userId } })

        res.status(200).send({
            succes: true,
            msg: "Users add",
            data: {
                users: users,
                dataPost: post
            }
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

// getUsers By Email
export const getUserVeryfy = async (req, res) =>
{
    const email = req.params.email
    try
    {
        const users = await Users.findOne({
            attributes: ["userId", "email", "name", "image_profile"], where: {
                email: email,
                isActive: true,
            }
        })
        if (!users)
        {
            return res.status(400).send({
                succes: false,
                msg: "No data"
            })
        }
        res.status(200).send({
            succes: true,
            msg: "Users add",
            data: users
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


// register
export const setUsers = async (req, res, next) =>
{
    const t = await dbApps.transaction()
    try
    {
        const valid = {
            name: "requered",
            email: "requered,isEmail",
            password: "requered,isStrongPassword",
            conformPassword: "requered",
            pin: "requered"
        }
        const users = await dataValid(valid, req.body);
        if (users.data.password !== users.data.conformPassword)
        {
            users.message.push("Password not match")
            return res.status(400).send({
                succes: false,
                msg: "Password not match"
            });
        }
        if (users.data.length > null)
        {
            return res.status(400).send({
                succes: false,
                msg: "please Create yourName"
            });
        }
        // Validasi Users in database 
        const vUsers = await Users.findOne({
            where: {
                email: users.data.email,
            }
        });
        if (vUsers)
        {
            return res.status(400).send({
                succes: false,
                msg: "Register field",
                errors: ["Email already activated"],
            });
        }
        // Validasi name 
        const nameV = await Users.findOne({
            where: {
                name: users.data.name
            }
        })
        if (nameV)
        {
            return res.status(400).send({
                succes: false,
                msg: "Register field",
                errors: ["Name already activated"],
            })
        }
        // Create Data
        const outData = await Users.create({
            ...users.data,
            image_profile: "_",
            image: "_",
            bio: "No Bio Nyet",
            is_active: false,
            expireTime: new Date(),
        }, { transaction: t })
        // Send Mail
        const validMails = await sendMail(outData.email, outData.userId)
        if (!validMails)
        {
            await t.rollback()
            return res.status(400).send({
                succes: false,
                msg: "Register field",
                error: ["Email not found"]
            })
        } else
        {
            await t.commit()
            res.status(201).send({
                succes: true,
                msg: "Register SuccesFully!",
                r: {
                    name: outData.name,
                    email: outData.email,
                    image_profile: outData.image_profile,
                    image: outData.image,
                    bio: outData.bio,
                    expireTime: outData.expireTime.toString()
                }
            })
        }
    } catch (error)
    {
        await t.rollback();
        res.status(500).send({
            succes: false,
            msg: "data not Valid",
            error: error.message
        })
    }
}

// ativity
export const setActivateUser = async (req, res, next) =>
{
    try
    {
        const user_id = req.params.id;
        // dapatkan data user yang masih inactive
        const user = await Users.findOne({
            where: {
                userId: user_id,
                isActive: false,
                expireTime: {
                    [Op.gte]: new Date(),
                },
            },
        });
        if (!user)
        {
            return res.status(404).json({
                errors: ["User not found or expired"],
                message: "Activate user field",
                data: null,
            });
        } else
        {
            user.isActive = true;
            user.expireTime = null;
            await user.save();
            return res.status(200).json({
                errors: [],
                message: "Activate user success",
                data: {
                    name: user.name,
                    email: user.email,
                },
            });
        }
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "data not Valid",
            error: error.message
        })
    }
};

// login
export const setLogin = async (req, res, next) =>
{
    try
    {
        const valid = {
            name: "requered",
            password: "requered",
        };
        const user = await dataValid(valid, req.body);
        const data = user.data;
        if (user.message.length > null)
        {
            return res.status(400).json({
                errors: user.message,
                msg: "Login field",
                data: data,
            });
        } else
        {
            // get user with name
            const user = await Users.findOne({
                where: {
                    name: data.name,
                    isActive: true,
                },
            });
            // check user
            if (!user)
            {
                return res.status(404).json({
                    errors: ["User not found"],
                    msg: "Login field",
                    data: data,
                });
            }
            if (user.isLogin == true)
            {
                return res.status(422).send({
                    succes: false,
                    msg: "You are logged in"
                })
            }
            // check password
            if (compare(data.password, user.password))
            {
                // generate token
                const usr = {
                    userId: user.userId,
                    name: user.name,
                    email: user.email,
                    image_profile: user.image_profile,
                };
                const token = generateAccessToken(usr);
                const refresh = generateRefreshToken(usr);
                await Users.update({ isLogin: true }, { where: { userId: user.userId } })
                return res.status(200).json({
                    errors: [],
                    msg: "Login success",
                    data: {
                        userId: user.userId,
                        name: user.name,
                        email: user.email,
                    },
                    acessToken: token,
                    refreshToken: refresh,
                });
            } else
            {
                return res.status(400).json({
                    errors: ["Wrong password"],
                    msg: "Wrong password",
                    data: data,
                });
            }
        }
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Servers",
            error: error.message
        })
    }
};

// Logout
export const setLogut = async (req, res) =>
{
    const name = req.body.name;
    try
    {
        const user = await Users.findOne({ where: { name: name } })
        if (!user)
        {
            return res.status(400).send({
                succes: false,
                msg: "User Not Found"
            })
        }
        if (user.isLogin == false)
        {
            return res.status(422).send({
                succes: false,
                msg: "You must log in"
            })
        }
        await Users.update({ isLogin: false }, { where: { userId: user.userId } })
        res.status(200).send({
            succes: true,
            msg: "you have successfully Logout"
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

// send ForgotPassword
export const setForgotpassword = async (req, res) =>
{
    try
    {
        const valid = {
            name: "requered"
        }
        const usersData = await dataValid(valid, req.body);
        if (usersData.message.length > 0)
        {
            return res.status(400).json({
                errors: usersData.message,
                message: "Forgot password field",
                data: usersData.data,
            });
        }
        const users = await Users.findOne({
            where: {
                name: usersData.data.name
            }
        });
        if (!users)
        {
            return res.status(404).json({
                errors: ["User not found"],
                message: "Forgot password field",
                data: null,
            });
        };
        // create Token 
        const random = new Entropy({ bits: 160, charset: charset32 });
        const stringPwd = random.string();
        // send Mails
        const sendMails = await sendforgot(users.email, users.email)
        if (!sendMails)
        {
            return res.status(400).send({
                succes: false,
                msg: "gagal Terkirim",
                err: error.message
            })
        } else
        {
            return res.status(200).send({
                succes: true,
                msg: "Terkirim",
                token: stringPwd
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

// reset Password 
export const setResetPassword = async (req, res) =>
{
    const t = await dbApps.transaction();
    try
    {
        const useremail = req.params.email;
        const valide = {
            password: "requered,isStrongPassword",
            conformPassword: "requered"
        }
        const validp = await dataValid(valide, req.body);
        if (validp.data.password !== validp.data.conformPassword)
        {
            return res.status(400).send({
                succes: false,
                msg: "Password Tidak Sama"
            })
        }
        const user = await Users.findOne({
            where: {
                email: useremail,
            }
        })
        if (!user)
        {
            return res.status(400).send({
                succes: false,
                msg: "errro"
            })
        }
        if (compare(validp.data.password, user.password))
        {
            return res.status(400).send({
                succes: false,
                msg: "Password Sama Dengan Yang lama"
            })
        }

        await Users.update({
            password: validp.data.password,
        },
            {
                where: {
                    user_id: user.userId,
                    isActive: true,
                },
                transaction: t,
            }
        );
        const result = await sendSucces(useremail, user.userId);
        if (!result)
        {
            await t.rollback();
            return res.status(400).json({
                errors: ["Email not found"],
                message: "Forgot password field",
                data: null,
            });
        }
        await t.commit();
        return res.status(200).json({
            errors: [],
            message: "Forgot password success, please check your email",
            data: null,
        });
    } catch (error)
    {
        res.status(500).send({
            succes: false,
            msg: "Internal Server Error",
            err: error.message
        })
    }
}

// save image
export const setImage = async (req, res) =>
{
    const name = req.params.id;
    if (!name) return res.sendStatus(400);
    const user = await Users.findOne({ where: { name: name } })
    if (!user) return res.sendStatus(422);
    // file
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/photoProfile/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.jfif', '.gif'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./uploads/photoProfile/${fileName}`, async (err) =>
    {
        if (err) return res.status(500).json({ msg: err.message });
        try
        {
            // Update PRofile
            await Users.update({ image_profile: url, image: fileName }, { where: { userId: user.userId } });
            res.status(200).json({ succes: true, msg: "Successfuly" });
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

// Refresh Token 
export const setRefreshToken = async (req, res, next) =>
{
    try
    {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)
        {
            return res.status(401).json({
                errors: ["Invalid token"],
                message: "No token provided",
                data: null,
            });
        }
        const verify = verifyRefreshToken(token);
        if (!verify)
        {
            return res.status(401).json({
                errors: ["Invalid token"],
                message: "Provided token is not valid",
                data: null,
            });
        }
        let data = parseJwt(token);
        const user = await Users.findOne({
            where: {
                email: data.email,
                isActive: true,
            },
        });
        if (!user)
        {
            return res.status(404).json({
                errors: ["User not found"],
                message: "Provided token is not valid",
                data: null,
            });
        } else
        {
            const usr = {
                userId: user.userId,
                name: user.name,
                email: user.email,
            };
            const token = generateAccessToken(usr);
            const refresh = generateRefreshToken(usr);
            return res.status(200).json({
                errors: [],
                message: "Refresh success",
                data: {
                    userId: user.userId,
                    name: user.name,
                    email: user.email,
                },
                acessToken: token,
                refreshToken: refresh,
            });
        }
    } catch (error)
    {
        next(
            new Error(
                "controllers/userController.js:setRefreshToken - " + error.message
            )
        );
    }
};
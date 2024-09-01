import JsonWebToken from "jsonwebtoken";
import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";

const generateAccessToken = (user) =>
{
    return JsonWebToken.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1800s",
    });
};

const generateRefreshToken = (user) =>
{
    return JsonWebToken.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "86400s",
    });
};

function verifyRefreshToken(token)
{
    try
    {
        return JsonWebToken.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err)
    {
        return null;
    }
}

const parseJwt = (token) =>
{
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

const verifyAccessToken = (token) =>
{
    try
    {
        return JsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err)
    {
        null;
    }
};


const accesstTokenDB = (user) =>
{
    return jsonwebtoken.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
    })
}
const refreshTokenDB = (user) =>
{
    return jsonwebtoken.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
    })
}

export
{
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    parseJwt,
    verifyAccessToken,
    accesstTokenDB,
    refreshTokenDB
};
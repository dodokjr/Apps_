import { verifyAccessToken } from "../utilities/jwt.js";


const autenticate = (req, res, next) =>
{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
    {
        return res.status(401).json({
            errors: ["No token provided"],
            message: "Verify token field",
            data: null,
        });
    }
    const user = verifyAccessToken(token);
    if (!user)
    {
        return res.status(401).json({
            errors: ["Invalid token"],
            message: "Verify token field",
            data: null,
        });
    }

    req.user = user;
    next();
};

export { autenticate };
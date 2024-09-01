import validator from "validator";
import { isExists, sanitization } from "./sanitization.js";

const userValid = (dt) =>
{
    let message = [];
    let data = sanitization(dt);
    if (isExists(data.name) && validator.isEmpty(data.name))
    {
        message.push("name is required");
    }
    if (isExists(data.email) && validator.isEmpty(data.email))
    {
        message.push("email is required");
    }
    if (isExists(data.email) && !validator.isEmail(data.email))
    {
        message.push("email is invalid");
    }
    if (isExists(data.password) && validator.isEmpty(data.password))
    {
        message.push("password is required");
    }
    if (isExists(data.password) && !validator.isStrongPassword(data.password))
    {
        message.push(
            "Password most be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol"
        );
    }
    return { message, data };
};

export { userValid };
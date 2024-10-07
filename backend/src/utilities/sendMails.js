import nodemailer from "nodemailer"
import Mailgen from "mailgen";

const base_url = "http://localhost:5173/actifity";
const base_url_forgotpassword = "http://localhost:5173/forgotpassword"
const base_url_S = "http://localhost:5173"

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "eleonore.cummerata@ethereal.email",
        pass: "FA61c2Mydn3bsXZtcV",
        // pass: "kmitedmrvcdsspzn",
    },
});


const MailGenerator = new Mailgen({
    theme: "salted",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})


const createEmail = (email, token) =>
{
    return {
        from: "testing@gmail.com",
        to: email,
        subject: "Activation Confirmation",
        html:
            "<h3>For Activate Account, click link bellow</h3>" +
            "<a href='" +
            base_url +
            "" +
            token +
            "'>Link Activasi</a>",
    };
};

const contentPwd = (email, password) =>
{
    return {
        from: "testing@gmail.com",
        to: email,
        subject: "Forgot Password",
        html:
            "<h3>Your new account password is :</h3>" +
            "<table>" +
            "<tr><td>Email :</td><td>" +
            email +
            "</td></tr>" +
            "<tr><td>Password :</td><td>" +
            password +
            "</td></tr>" +
            "</table>",
    };
};


const contentfg = (email, token) =>
{
    return {
        from: "testing@gmail.com",
        to: email,
        subject: "Forgot Password",
        html:
            "<h3>Your Reset password is :</h3>" +
            "<table>" +
            "<tr><td>Email :</td><td>" +
            email +
            "</td></tr>" +
            "<tr><td>Password :</td><td>" +
            "<a href='" +
            base_url_forgotpassword +
            "/" +
            token +
            "'>Reset Password</a>" +
            "</td></tr>" +
            "</table>",
    };
};

const contentsucces = (email, token) =>
{
    return {
        from: "testing@gmail.com",
        to: email,
        subject: "reset Password Succes",
        html:
            "<h3>Your Reset password is Succes</h3>" +
            "<a href='" +
            base_url_S +
            "/login?userId=" +
            token +
            "'>Succers Reset Password</a>",
    };
};


const sendMail = (email, token) =>
{
    return new Promise((resolve, reject) =>
    {
        transporter.sendMail(createEmail(email, token), function (error, info)
        {
            if (error)
            {
                console.log(error);
                resolve(false);
            } else
            {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};

const sendPassword = (email, password) =>
{
    return new Promise((resolve, reject) =>
    {
        transporter.sendMail(contentPwd(email, password), function (error, info)
        {
            if (error)
            {
                console.log(error);
                resolve(false);
            } else
            {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};


const sendforgot = (email, token) =>
{
    return new Promise((resolve, reject) =>
    {
        transporter.sendMail(contentfg(email, token), function (error, info)
        {
            if (error)
            {
                console.log(error);
                resolve(false);
            } else
            {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};

const sendSucces = (email, token) =>
{
    return new Promise((resolve, reject) =>
    {
        transporter.sendMail(contentsucces(email, token), function (error, info)
        {
            if (error)
            {
                console.log(error);
                resolve(false);
            } else
            {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};

export { sendMail, sendPassword, sendforgot, sendSucces };
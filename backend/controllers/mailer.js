import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'quinton36@ethereal.email',
        pass: 'XdN85Znxf8zxnzyM8M'
    }
});

const MailGenerator = new Mailgen({
    theme: "salted",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

export const registerMail = async (req, res) =>
{
    const { uname, uemail, text, subject } = req.body;

    const email = MailGenerator.generate({
        body: {
            name: uname,
            intro: text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: 'http://localhost:5173/login'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    });

    let messagess = {
        from: process.env.CONFIG_EMAIL,
        to: uemail,
        subject: "Signup Successful" || subject,
        html: email
    }

    transporter.sendMail(messagess).then(() =>
    {
        return res.status(200).send({
            succes: true,
            msg: "Verifikasi Terkirim"
        })
    }).catch(e =>
    {
        return res.status(400).send({
            succes: false,
            msg: "Verifikasi gagal terkirim",
            error: e
        })
    })
}
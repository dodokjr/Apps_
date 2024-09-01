import nodemailer from "nodemailer"
import Mailgen from "mailgen";

const base_url = "http://localhost:3100/v1/f/activate/";



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

const thameLoginMail = (email, name) =>
{
    const thame = MailGenerator.generate({
        body: {
            name: name,
            intro: 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: 'http://localhost:5173/'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    })

    return {
        from: "testing12@gmail.com",
        to: email,
        subject: "Hello everyOne Happy Your Login Apps",
        html:
            "<h3>Happy Your Apps</h3>"
    }
}

const sendLoginMail = (email, name) =>
{
    return new Promise((resolve, reject) =>
    {
        transporter.sendMail(thameLoginMail(email, name) = (err, info) =>
        {
            if (err)
            {
                console.log(err);
                resolve(false);
            } else
            {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        })
    })
}


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

export { sendMail, sendPassword, sendLoginMail };
import otpGenerator from 'otp-generator';


export const generateOTP = async (req, res) =>
{
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    res.status(200).send({ succes: true, code: req.app.locals.OTP })
}

export const verifyOtp = async (req, res) =>
{
    const { code } = req.body
    if (parseInt(req.app.locals.OTP) === parseInt(code))
    {
        req.app.locals.OTP = null;
        return res.status(200).send({
            succes: true,
            msg: "Verify Successsfully!"
        })
    } else
    {
        return res.status(400).send({
            succes: false,
            msg: "error Data Otp"
        })
    }
}

var nodemailer = require('nodemailer')
const { ACCOUNT_VERIFICATION_MAIL, FORGOT_PASSWORD_OTP, UPDATE_PASSWORD, LOGIN_EMAIL, RESEND_OTP } = require('./email_temp')

module.exports = {
    async sendMail(email, subject, html) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dhimanaditya.0111@gmail.com',
                pass: "gkht rtzl qfww cflq"
            }
        });
        var mailOptions = {
            user: 'dhimanaditya.0111@gmail.com',
            to: email,
            subject: subject,
            html: html
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Email sent" + info.response)
            }
        });
    },
    async sendCountil(email, userName, otp) {
        const subject = `Account verification E-mail`
        const html = ACCOUNT_VERIFICATION_MAIL(userName, otp)
        const sendMail = await this.sendMail(email, subject, html)
    },
    async forgotPass(email, userName, otp) {
        const subject = 'Password reset mail'
        const html = FORGOT_PASSWORD_OTP(userName, otp)
        const sendMail = await this.sendMail(email, subject, html)
    },
    async passUpdate(email, userName) {
        const subject = 'Password update mail'
        const html = UPDATE_PASSWORD(userName)
        const sendMail = await this.sendMail(email, subject, html)
    },
    async loginEmail(email, userName) {
        const subject = "Login mail"
        const html = LOGIN_EMAIL(userName)
        const sendMail = await this.sendMail(email, subject, html)
    },
    async resendOtp(email, userName, otp) {
        const subject = 'Resend Otp mail'
        const html = RESEND_OTP(userName, otp)
        const sendMail = await this.sendMail(email, subject, html)
    }
}
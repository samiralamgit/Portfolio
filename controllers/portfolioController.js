const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

// transport function
const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: process.env.API_SENDGRID,
        },
    })
)


const sendEmailController = (req, res) => {
    try {
        const { name, email, msg } = req.body;
        // validation
        if (!name || !email || !msg) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        // email matter
        transporter.sendMail({
            to: '5533samiralam@gmail.com',
            from: 'sa1889935@gmail.com',
            subject: 'Regarding Mern Portfolio App',
            html: `
            <h5>Detail Information</h5>
            <ul>
            <li><p>Name: ${name}</p></li>
            <li><p>Name: ${email}</p></li>
            <li><p>Name: ${msg}</p></li>
            </ul>
            `
        })

        return res.status(200).send({
            success: true,
            message: 'Your Message send Successfully',
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Send Email API Error',
            error
        });
    }
}

module.exports = {
    sendEmailController,
}
const nodemailer = require("nodemailer");

let userContacting = async (userfirstname, userlastname, useremail, message, phone) => {
    try {
        console.log("User want to contact with team");
        console.log(userfirstname, useremail);

        let transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
        let info = await transporter.sendMail({
            from: '"MealMate contact" <roadster.com@zohomail.in>',
            to: "vedang.surnis@gmail.com",
            subject: `${userfirstname} ${userlastname} inquiry through website`,
            html: `<p>Dear MealMate Team,
            <br>
            I hope this email finds you well. I recently visited your website and had a few questions that I wanted to ask. I used the Contact Us form on your website to reach out to your team, and I'm grateful for this opportunity to communicate with you.
            <br>
            I would like to inquire about ${message}. I couldn't find the information I was looking for on your website, so I thought it would be best to contact your team directly. My email address is ${useremail}  and phone number is ${phone}
            </p>`
        });
        console.log(info);
        return info;
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success: "false",
            message: "SMTP server side error",
        })
    }
}

module.exports = userContacting;
const nodeMailer = require('nodemailer');
const EmailTemplates = require('email-templates');

const path = require('path');

const {EmailEnums: {NODE_MAILER_SERVICE, NODE_MAILER_USER, NODE_MAILER_PASS}} = require('../constants/');
const htmlTemplates = require('../emailTemplates/mainEmailTemplate');


const transporter = nodeMailer.createTransport({
    service: NODE_MAILER_SERVICE,
    auth: {
        user: NODE_MAILER_USER,  // generated ethereal user
        pass: NODE_MAILER_PASS,  // generated ethereal password
    },
});


const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'emailTemplates')
    }
});


class EmailService {
    async sendMail(userMail, action, context) {
        const templateInfo = htmlTemplates[action];
        const html = await emailTemplates.render(templateInfo.templateName, context);

        const mailOptions = {
            from: 'TruNodeMailSender',
            to: userMail,
            subject: templateInfo.subject,
            html
        };
        return transporter.sendMail(mailOptions);
    }
}

// verify connection configuration

transporter.verify((error, success) =>
    error ? console.log(error) : console.log("Server is ready to take our messages"));

module.exports = new EmailService();

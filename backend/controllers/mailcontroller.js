const nodemailer = require('nodemailer');

module.exports = {
    newaccount: function newAccountMail(req, res, next) {

        let email = req[0]
        let pass = req[1]
        // Email template
        const output = `
          <h2>New Account Created</h2>
          <h3>Use below credentials to login</h3>
          <p><b>Email: </b><span>${email}</span></p>
          <p><b>Password: </b><span>${pass}</span></p>
        `;
        console.log(output);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465 and false for other ports
            auth: {
                user: 'blueberryse3040@gmail.com', // generated ethereal user
                pass: 'vwhojlyqsirczsqa'  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Notes" <blueberryse3040@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `New User Account Created`, // Subject line
            text: 'Notes', // plain text body
            html: output // html body
        };

        // send mail with specified transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('contact', { msg: 'Email has been sent' });
        });
    }

}
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const sendMail = (name, temPassword, email, url) => {
  //initialize nodemailer
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "blueberryse3040@gmail.com",
      pass: "vwhojlyqsirczsqa",
    },
  });

  const handleBar = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };

  transporter.use("compile", hbs(handleBar));

  var mailOptions = {
    from: "My Notes",
    to: email,
    subject: "My Notes",
    text: "hi",
    template: "email",
    context: {
      name: name,
      email: email,
      temPassword: temPassword,
      url: url,
    },
  };

  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default sendMail;


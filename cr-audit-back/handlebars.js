import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

var transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "eshopmedia.audit.manager@mail.ru",
    pass: "hz4WuzzdDjNgCjN0mtyv",
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: "views",
    defaultLayout: false,
  },
  viewPath: "views",
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

export const mailer = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

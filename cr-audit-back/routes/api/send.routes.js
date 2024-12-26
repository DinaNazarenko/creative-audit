import { Router } from "express";
import { mailer } from "../../handlebars.js";
import { v4 as uuidv4 } from "uuid";

export const sendApiRoute = new Router();

sendApiRoute.post("/send", async (req, res) => {
  try {
    const { email } = req.body;

    const generatedLink = uuidv4();

    var mailOptions = {
      from: "Audit Manager <eshopmedia.audit.manager@mail.ru>",
      to: email,
      subject: "Восстановление пароля",
      template: "email",
      context: {
        link: generatedLink,
      },
    };

    mailer(mailOptions);

    res.status(200).json({ message: "Email успешно отправлен" });
  } catch (error) {
    console.error("Ошибка отправки email:", error);
    res.status(500).json({ message: "Ошибка отправки email" });
  }
});
  
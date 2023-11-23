const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
  console.log("<<<<< Send Mail file >>>>>>");

  try {
    const transporter = await nodemailer.createTransport({
      host: "gmail",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.APP_EMAIL_ID,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });

    const mailOption = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", mailOption);
    const result = await transporter.sendMail(mailOption);
    console.log("Mail status :", result);
    console.log("Mail sent successfully");
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Database error occurred in send mail" });
  }
  console.log(
    "Email service :>>",
    process.env.APP_EMAIL_ID,
    process.env.APP_EMAIL_PASSWORD
  );
};

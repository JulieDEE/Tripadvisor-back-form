const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "Julie DEE",
  key: process.env.MAILGUN_API_KEY,
});

app.post("/contact", (req, res) => {
  mg.messages
    .create(process.env.SANDBOX, {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: process.env.MAIL_ADRESS,
      subject: "Vous avez reçu un message sur Tripadvisor",
      text: req.body.message,
    })
    .then((msg) => res.json(msg.message))
    .catch((err) => res.json(err.message));
});

app.all("*", (req, res) => {
  res.json("ERROR 404, page not found");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT 3000");
});

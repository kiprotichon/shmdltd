const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Contact form endpoint
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Configure your email transport (Gmail, Outlook, or your domain SMTP)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kiprotichton9@gmail.com", // 🔑 your email
        pass: "fnja qiiy sytu nzlh", // 🔑 your Gmail App Password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: email,
      to: "kiprotichton9@gmail.com", // where you want to receive form submissions
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });

    res.json({ success: true, message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "❌ Error sending message.", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

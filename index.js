import express from 'express';
import ImageDataURI from 'image-data-uri';
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, //ssl
        auth: {
            user: "museum2022@zohomail.com",
            pass: "Z6f7FKBm0EMi"
        }
    });
    let info = await transporter.sendMail({
      from: 'museum2022@zohomail.com', // sender address
      to: "museum2022@rambler.ru", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello worldcdsfcsfaascsa?", // plain text body
      html: "<b>Hello world?</b>", 
    });
}

app.get('/', (req, res) => {
    res.send('Server is fine');
});

app.post("/send", (req, res) => {
    const name = (Math.random() + 1).toString(36).substring(7);
    ImageDataURI.outputFile(req.body.dataURL, `./media/${name}.png`);
    main().catch(console.error);
    res.json({
        "success": true
    });
});


app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
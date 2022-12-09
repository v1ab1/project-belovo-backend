import express from 'express';
import ImageDataURI from 'image-data-uri';
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors());

async function main(name) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: 'email host', //choose email host
        port: 465, //choose port
        secure: true, //ssl or false
        auth: {
            user: "sender email", //sender address
            pass: "email password" //password
        }
    });
    let info = await transporter.sendMail({
      from: '*sender email*', // sender address
      to: "reciever email", // list of receivers
      subject: "Письмо солдатам",
      text: "Картинка",
      html: `<img src="./media/${name}.png" alt=""/>`, 
      attachments: [{
        filename: `${name}.png`,
        path: `./media/${name}.png`
      }]
    });
}

app.get('/', (req, res) => {
    res.send('Server is fine');
});

app.post("/send", (req, res) => {
    const name = (Math.random() + 1).toString(36).substring(7);
    ImageDataURI.outputFile(req.body.dataURL, `./media/${name}.png`);
    main(name).catch(console.error);
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

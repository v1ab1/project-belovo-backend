import express from 'express';
import ImageDataURI from 'image-data-uri';
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is fine');
});

app.post("/send", (req, res) => {
    const name = (Math.random() + 1).toString(36).substring(7);
    ImageDataURI.outputFile(req.body.dataURL, `./media/${name}.png`);
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
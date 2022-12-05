import express from 'express';

const app = express();

app.get('/', (req, res) => {
    console.log('hello');
});

app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
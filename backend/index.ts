import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Server set up');
})

app.listen(PORT);
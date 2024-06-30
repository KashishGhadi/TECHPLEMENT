const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/quotesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

const quoteSchema = new mongoose.Schema({
    text: String,
    author: String
});

const Quote = mongoose.model('Quote', quoteSchema);

app.get('/random', async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuote = await Quote.findOne().skip(randomIndex);
        res.json(randomQuote);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/quote', async (req, res) => {
    const author = req.query.author;
    try {
        const quotes = await Quote.find({ author: new RegExp(author, 'i') });
        res.json(quotes);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:$3000`);
});

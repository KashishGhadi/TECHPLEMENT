// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/quotesDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

const quoteSchema = new mongoose.Schema({
    text: String,
    author: String
});

const Quote = mongoose.model('Quote', quoteSchema);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/random-quote', async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        const random = Math.floor(Math.random() * count);
        const quote = await Quote.findOne().skip(random);
        res.json(quote);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/quotes/:author', async (req, res) => {
    try {
        const quotes = await Quote.find({ author: req.params.author });
        res.json(quotes);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:$3000`);
});

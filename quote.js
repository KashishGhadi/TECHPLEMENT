//indes.js
const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const url = 'mongodb://localhost:27017';
const dbName = 'quoteOfTheDay';

let db;
// connecting to mongodb
MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true },(err,client)=>{
    if (err){
        console.error('error connecting to mongodb:', err);
        return;
    }
    console.log('connected to mongodb');
    db = client.db(dbName);
});

//random quotes
app.get('/quote', (req, res)=>{
    const collection = db.collection('quotes');
    collection.aggregate([{$sample: { size: 1 }}]).toArray((err, result) => {
        if (err){
            console.error('error fetching random quote:', err);
            res.status(500).json({error: 'failed to fetch random quote'});
            return;
        }
        res.json(result[0]);
    });
});

// searching quotes by author name
app.get('/search', (req, res) =>{
    const author = req.query.author.toLowerCase();
    const collection = db.collection('quotes');
    collection.find({ author: { $regex: author, $options: 'i'}}).toArray ((err, result) =>{
        if(err){
            console.error(' error in searching quotes',err);
            res.status(500).json({error: 'failed to search quotes'});
            return;
        }
        resw.json(result);
    });
});

app.listen(3000, () =>{
    console.log('server is running on http://QuoteOfTheDay');
});

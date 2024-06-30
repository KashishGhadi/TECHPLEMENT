const { MongoClient } = require('mongodb');
const fs = require('fs');

const url = 'mongodb://localhost:27017';
const dbName = 'quoteOfTheDay';

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db(dbName);
        const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));
        db.collection('quotes').insertMany(quotes, (err, res) => {
            if (err) throw err;
            console.log('Number of quotes inserted: ' + res.insertedCount);
            client.close();
        });
    })
    .catch(error => console.error(error));

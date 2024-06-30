const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;  // Define the PORT variable

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/quotesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
const quotesRouter = require('./routes/quotes');
app.use('/quotes', quotesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:$3000`);
});

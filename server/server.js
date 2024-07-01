const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/quotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Quotes API');
});

const quoteRoutes = require('./routes/quotes');
app.use('/api/quotes', quoteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3010`);
});

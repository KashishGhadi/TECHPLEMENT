const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quotesRoute = require('./routes/quotes');  // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quotes', quotesRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quotesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:$3000`);
});

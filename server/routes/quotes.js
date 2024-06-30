const express = require('express');
const router = express.Router();

// Dummy route to check if the file is being loaded
router.get('/', (req, res) => {
    res.send('Quotes route is working');
});

module.exports = router;

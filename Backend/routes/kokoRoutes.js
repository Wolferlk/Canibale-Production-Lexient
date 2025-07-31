const express = require('express');
const router = express.Router();
const { createKokoOrder } = require('../controllers/kokoController');

// Create order
router.post('/create-order', createKokoOrder);

module.exports = router; 

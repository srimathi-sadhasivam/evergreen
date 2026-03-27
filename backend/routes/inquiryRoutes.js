const express = require('express');
const { createInquiryOrder, createContactOrder } = require('../controllers/inquiryController');

const router = express.Router();

// Create order from product inquiry
router.post('/product', createInquiryOrder);

// Create order from contact form  
router.post('/contact', createContactOrder);

module.exports = router;

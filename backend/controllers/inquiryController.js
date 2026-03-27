const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Create order from product inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiryOrder = asyncHandler(async (req, res) => {
  const { customerName, phoneNumber, productName, quantity, totalPrice, source = 'product_inquiry' } = req.body;

  // Validation
  if (!customerName || !productName || !quantity || !totalPrice) {
    res.status(400);
    throw new Error('Missing required fields: customerName, productName, quantity, totalPrice');
  }

  try {
    // Create order without user authentication (for public inquiries)
    const order = await Order.create({
      user: null, // No user ID for public inquiries
      customerInfo: {
        name: customerName,
        phone: phoneNumber,
      },
      items: [{
        product: {
          name: productName,
        },
        quantity: parseInt(quantity),
        price: parseFloat(totalPrice),
      }],
      totalAmount: parseFloat(totalPrice),
      status: 'pending',
      source: source, // Track the source of this order
      inquiryType: 'product', // Mark as product inquiry
    });

    res.status(201).json({
      success: true,
      orderId: order._id,
      message: 'Inquiry order created successfully'
    });

  } catch (error) {
    console.error('Error creating inquiry order:', error);
    res.status(500);
    throw new Error('Failed to create inquiry order');
  }
});

// @desc    Create order from contact form
// @route   POST /api/inquiries
// @access  Public  
const createContactOrder = asyncHandler(async (req, res) => {
  const { customerName, phoneNumber, message, source = 'contact_form' } = req.body;

  // Validation
  if (!customerName || !message) {
    res.status(400);
    throw new Error('Missing required fields: customerName, message');
  }

  try {
    // Create order without user authentication (for public inquiries)
    const order = await Order.create({
      user: null, // No user ID for public inquiries
      customerInfo: {
        name: customerName,
        phone: phoneNumber,
      },
      items: [{
        product: {
          name: 'General Inquiry',
        },
        quantity: 1,
        price: 0, // No specific price for contact form inquiries
      }],
      totalAmount: 0,
      status: 'pending',
      source: source, // Track the source of this order
      inquiryType: 'contact', // Mark as contact inquiry
      message: message, // Store the original message
    });

    res.status(201).json({
      success: true,
      orderId: order._id,
      message: 'Contact inquiry created successfully'
    });

  } catch (error) {
    console.error('Error creating contact order:', error);
    res.status(500);
    throw new Error('Failed to create contact order');
  }
});

module.exports = {
  createInquiryOrder,
  createContactOrder,
};

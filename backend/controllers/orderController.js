const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Recalculate prices from DB to avoid tampering
  const dbProducts = await Product.find({
    _id: { $in: items.map((i) => i.product) },
  });

  const itemsWithPrices = items.map((item) => {
    const product = dbProducts.find((p) => p._id.toString() === item.product);
    if (!product) {
      throw new Error('Invalid product in order');
    }

    return {
      product: product._id,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const totalAmount = itemsWithPrices.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user._id,
    items: itemsWithPrices,
    totalAmount,
  });

  res.status(201).json(order);
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('items.product', 'name price imageUrl')
    .sort({ createdAt: -1 });

  res.json(orders);
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate('items.product', 'name price imageUrl')
    .sort({ createdAt: -1 });

  res.json(orders);
});

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id
// @access  Admin
const updateOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status || order.status;

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// @desc    Delete order (admin)
// @route   DELETE /api/orders/:id
// @access  Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  await order.deleteOne();

  res.json({ message: 'Order removed' });
});

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};


const express = require('express');
const { createOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);
router.put('/:id', protect, admin, updateOrder);
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;


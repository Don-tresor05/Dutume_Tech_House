const express = require('express');
const {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStatistics
} = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// Customer routes
router.post('/', authenticate, authorize(['customer']), createOrder);
router.get('/my-orders', authenticate, authorize(['customer']), getUserOrders);
router.get('/:id', authenticate, getOrderById);
router.post('/:id/cancel', authenticate, cancelOrder);

// Admin/Manager routes
router.get('/', authenticate, authorize(['admin', 'manager']), getAllOrders);
router.put('/:id/status', authenticate, authorize(['manager', 'admin']), updateOrderStatus);

// Admin only routes
router.get('/admin/statistics', authenticate, authorize(['admin']), getOrderStatistics);

module.exports = router;
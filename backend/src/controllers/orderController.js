const Order = require('../models/orderModel');
const { addToNotificationQueue } = require('../queue/notificationQueue');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Validate order items
    await Order.validateOrderItems(items);

    const orderId = await Order.create(req.user.id, items);
    const order = await Order.findById(orderId);

    // Add to notification queue
    await addToNotificationQueue({
      type: 'order_created',
      userId: req.user.id,
      orderId: orderId,
      message: `Your order #${orderId} has been placed successfully.`
    });

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin/manager
    if (req.user.role === 'customer' && order.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await Order.findByUserId(req.user.id, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;

    const result = await Order.findAll(page, limit, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    const updated = await Order.updateStatus(orderId, status);
    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = await Order.findById(orderId);

    // Add to notification queue for status updates
    if (status === 'shipped' || status === 'delivered') {
      await addToNotificationQueue({
        type: 'order_status_update',
        userId: order.user_id,
        orderId: orderId,
        message: `Your order #${orderId} status has been updated to ${status}.`
      });
    }

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (req.user.role === 'customer' && order.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const cancelled = await Order.cancel(orderId);
    if (!cancelled) {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }

    // Add to notification queue
    await addToNotificationQueue({
      type: 'order_cancelled',
      userId: req.user.id,
      orderId: orderId,
      message: `Your order #${orderId} has been cancelled.`
    });

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderStatistics = async (req, res) => {
  try {
    const stats = await Order.getStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStatistics
};
// controllers/orderController.js
const Order = require('../models/Order');

// GET all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// GET a single order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

// POST a new order
exports.addOrder = async (req, res) => {
  const { name, phone1, phone2, address, cartItems, totalAmount, status, email, city, district } = req.body;

  try {
    // Get the last order to determine the next ID
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });

    let nextOrderNumber = 1;

    if (lastOrder && lastOrder.odercid) {
      const lastIdNumber = parseInt(lastOrder.odercid.replace("CNO", ""));
      if (!isNaN(lastIdNumber)) {
        nextOrderNumber = lastIdNumber + 1;
      }
    }

    // Format the new order ID (e.g., CNO0001)
    const odercid = `CNO${String(nextOrderNumber).padStart(4, '0')}`;

    const newOrder = new Order({
      name,
      phone1,
      phone2,
      address,
      email,
      city,
      district,
      cartItems,
      totalAmount,
      status: status || 'pending',
      odercid,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Order Save Error:', error);
    res.status(400).json({ message: 'Error adding order', error });
  }
};

// PUT (update) an order by ID
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, updates, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error });
  }
};

// DELETE an order by ID
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};

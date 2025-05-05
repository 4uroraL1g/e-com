const express = require('express');
const router = express.Router();
const Orders = require('../models/orders'); // Import the Orders model

// Get all orders
router.get('/', async (req, res) => {
    try {
        const ordersList = await Orders.find(req.query);

        if (!ordersList || ordersList.length === 0) {
            console.error('No orders found');
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.status(200).json({ success: true, orders: ordersList });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id);

        if (!order) {
            console.error('Order not found');
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching order' });
    }
});

// Get total order count
router.get('/get/count', async (req, res) => {
    try {
        const orderCount = await Orders.countDocuments();

        res.status(200).json({ success: true, count: orderCount });
    } catch (error) {
        console.error('Error fetching order count:', error);
        res.status(500).json({ success: false, message: 'Error fetching order count' });
    }
});

// Get sales data
router.get('/sales', async (req, res) => {
    try {
        const currentYear = parseInt(req.query.year);
        const ordersList = await Orders.find();

        let totalSales = 0;
        const monthlySales = Array.from({ length: 12 }, (_, i) => ({
            month: new Date(0, i).toLocaleString('en-US', { month: 'short' }).toUpperCase(),
            sale: 0,
        }));

        for (const order of ordersList) {
            const orderDate = new Date(order.date);
            const year = orderDate.getFullYear();
            const month = orderDate.getMonth();

            if (year === currentYear) {
                totalSales += order.amount;
                monthlySales[month].sale += order.amount;
            }
        }

        res.status(200).json({ success: true, totalSales, monthlySales });
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ success: false, message: 'Error fetching sales data' });
    }
});

// Create a new order
router.post('/create', async (req, res) => {
    try {
        const order = new Orders({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            pincode: req.body.pincode,
            amount: req.body.amount,
            paymentId: req.body.paymentId,
            email: req.body.email,
            userid: req.body.userid,
            products: req.body.products,
            date: req.body.date,
        });

        const savedOrder = await order.save();
        console.log('Order created successfully:', savedOrder);
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Error creating order' });
    }
});

// Update an order by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                pincode: req.body.pincode,
                amount: req.body.amount,
                paymentId: req.body.paymentId,
                email: req.body.email,
                userid: req.body.userid,
                products: req.body.products,
                status: req.body.status,
            },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            console.error('Order not found for update');
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: 'Error updating order' });
    }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Orders.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            console.error('Order not found for deletion');
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: 'Error deleting order' });
    }
});

module.exports = router;
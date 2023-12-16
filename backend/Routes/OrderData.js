const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')


router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data;

    if (!data || !Array.isArray(data)) {

        res.status(400).json({ success: false, error: "Invalid data" });
        return;
    }

    data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } else {
            eId.order_data.push(data);
            await eId.save();
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, error: error.message });
    }
});


router.post('/myorderdata', async (req, res) => {
    try {
        let mydata = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: mydata })

    } catch (error) {
        res.send("server error", error.message);

    }
})

module.exports = router;
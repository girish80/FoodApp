const express = require('express');
const orders = require('../models/Orders');
const router = express.Router();

router.post('/orderData',async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0,0,{order_data: req.body.order_data})

    let eId = await orders.findOne({'email': req.body.email})
    console.log(eId)
    
    router.post('/orderData', async (req, res) => {
        // Validate request body
        if (!req.body.email || !req.body.order_data) {
            return res.status(400).json({ error: 'Email and order data are required' });
        }
    
        try {
            let data = req.body.order_data;
            await data.splice(0, 0, { order_data: req.body.order_data });
    
            let eId = await orders.findOne({ 'email': req.body.email });
            console.log(eId);
    
            if (eId === null) {
                await orders.create({
                    email: req.body.email,
                    order_data: [data]
                });
            } else {
                await orders.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                );
            }
    
            res.json({ success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server Error' });
        }
    });
    
    router.post('/myorderData', async (req, res) => {
        // Validate request body
        if (!req.body.email) {
            return res.status(400).json({ error: 'Email is required' });
        }
    
        try {
            let myData = await orders.findOne({ 'email': req.body.email });
            res.json({ orderData: myData });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server Error' });
        }
    });
    
    module.exports = router;
    
    if (eId === null) {
        try {
            await orders.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({ success: true})
            })
        } catch (error) {
            console.log(error.message);
            res.send("Server Error", error.message)
        }
    } else {
     try {
        await orders.findOneAndUpdate({email: req.body.email},
            { $push: { order_data: data}}).then(()=> {
                res.json( { success: true})
            })
     } catch (error) {
        res.send("Server Error", error.message)
     }   
    }
});

router.post('/myorderData', async(req,res)=>{
    try {
        let myData = await orders.findOne({'email': req.body.email})
        res.json({orderData: myData})
    } catch (error) {
        res.send("Server Error", error.message)
    }
})

module.exports = router;
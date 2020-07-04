const express = require('express');
const user_md = require('../../models/userModel');

const route = express.Router();

route.get('/', (req, res) => {
    const user_id = parseInt(req.query.user_id);

    user_md.getUserCart(user_id).then(result => {
        const products = result.map(r => ({
            id: r.id,
            name: r.product_name,
            images: r.product_images.split(",")[0],
            description: r.description,
            price: r.base_price,
            amount: r.amount,
        }));
        res.json({ success: true, error: '', products });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

route.post('/change', (req, res) => {
    const { user_id, product_id, amount } = req.body;

    user_md.changeAmountProductCart(user_id, product_id, amount).then(result => {
        res.json({ success: true, error: '', result });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

route.post('/delete', (req, res) => {
    const { user_id, product_id } = req.body;

    user_md.deleteProductCart(user_id, product_id).then(result => {
        res.json({ success: true, error: '', result });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

route.post('/create-bill', (req, res) => {
    const { user_id } = req.body;


});

module.exports = route;
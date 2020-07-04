const express = require('express');
const user_md = require('../../models/userModel');

const route = express.Router();

route.get('/', (req, res) => {
    const user_id = parseInt(req.query.user_id);

    user_md.getProductFavorites(user_id).then(result => {
        console.log(result);
        const products = result.map(r => ({
            id: r.id,
            name: r.product_name,
            images: r.product_images.split(",")[0],
            description: r.description,
            price: r.base_price,
        }));
        res.json({ success: true, error: '', products });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

route.get('/suggest', (req, res) => {
    user_md.getProductSuggest().then(result => {
        const productsuggest = result.map(r => ({
            id: r.id,
            name: r.product_name,
            images: r.product_images.split(",")[0],
            price: r.base_price,
        }));
        res.json({ success: true, error: '', productsuggest });
    }).catch(error => {
        console.log(error);

        res.json({ success: false, error });
    });
});

route.post('/add', (req, res) => {
    const { user_id, product_id } = req.body;

    user_md.addProductFavorite(user_id, product_id).then(result => {
        res.json({ success: true, error: '', result });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

route.post('/delete', (req, res) => {
    const { user_id, product_id } = req.body;

    user_md.deleteProductFavorite(user_id, product_id).then(result => {
        res.json({ success: true, error: '', result });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

module.exports = route;
const express = require("express");
const common_md = require('../../models/commonModel');
const product_md = require('../../models/productModel');

const route = express.Router();
route.get('/', async (req, res) => {
    try {
        const infoDashboard = await common_md.getInfoDashboard();
        res.json({ success: true, error: '', infoDashboard });
    } catch (e) {
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
    }
});

route.get('/top_product', (req, res) => {
    const limit = parseInt(req.query.limit);

    product_md.getTopSellingProducts(limit).then(results => {
        console.log(results);
        const topSellingProducts = results.map(r => ({
            id: r.id,
            product_name: r.product_name,
            base_price: r.base_price,
            unit: r.unit,
            quantity: r.quantity,
            product_images: r.product_images,
            count: r.count
        }));
        res.json({ success: true, error: '', topSellingProducts });
    }).catch(error => {
        res.json({ success: false, error });
    });
});


module.exports = route;
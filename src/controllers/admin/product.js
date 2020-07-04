const express = require('express');
const product_md = require('../../models/productModel');
const route = express.Router();

route.get('/pages', (req, res) => {
    const pageNum = parseInt(req.query.pageNum);
    const limit = parseInt(req.query.limit);
    const searchValue = req.query.searchValue;
    const filter = JSON.parse(req.query.filter);

    product_md.getProductAdminByPage(limit, pageNum, searchValue, filter).then(result => {
        const products = result.data.map(product => ({
            id: product.id,
            product_name: product.product_name,
            base_price: product.base_price,
            unit: product.unit,
            product_type_name: product.product_type_name,
            provider_name: product.provider_name,
            quantity: product.quantity,
        }));
        res.json({ success: true, error: '', products, pager: result.pager });
    }).catch(error => {
        console.log("error: ", error);
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' })
    });
});

route.post('/delete', (req, res) => {
    const { id } = req.body;

    product_md.deleteProduct(id).then(result => {
        res.json({ success: true, error: '', status: 'Xóa thành công' });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

route.post('/update', (req, res) => {
    const { id, base_price, quantity } = req.body;

    product_md.updateProduct(id, { base_price, quantity }).then(result => {
        console.log(result);
        res.json({ success: true, error: '', result });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

module.exports = route;
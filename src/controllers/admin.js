const express = require("express");
const attribute_md = require('../models/attibuteModel');

const route = express.Router();

route.use("/dashboard", require(__dirname + "/admin/dashboard.js"));
route.use("/user", require(__dirname + "/admin/user.js"));
route.use("/post", require(__dirname + "/admin/post.js"));
route.use("/product", require(__dirname + "/admin/product.js"));
route.use("/bill", require(__dirname + "/admin/bill.js"));

route.get('/', (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    res.write("<h1>This is Admin page.</h1>");
    res.end();
});

route.get('/provider', (req, res) => {
    attribute_md.getProviders()
        .then(results => {
            const providers = results.map(r => ({
                id: r.id,
                name: r.name,
                logo: r.logo
            }));
            res.json({ success: true, error: '', providers });
        }).catch(error => {
            console.log("error: ", error);
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        });
});

route.get('/product_type/:id/attributes', (req, res) => {
    const id = parseInt(req.params.id);
    attribute_md.getAttributeByProductTypeId(id)
        .then(results => {
            const productTypeAttrs = results.map(r => ({
                id: r.id,
                product_type_id: r.product_type_id,
                category_attribute_id: r.category_attribute_id,
                category_name: r.category_name,
            }));
            res.json({ success: true, error: '', productTypeAttrs });
        }).catch(error => {
            console.log(error);
            res.json({ success: false, error });
        });
});

route.get('/product_type/:id/attibutes_not_added', (req, res) => {
    const id = parseInt(req.params.id);
    attribute_md.getAttributeNotAdded(id)
        .then(results => {
            const productAttributes = results.map(r => ({
                id: r.id,
                name: r.category_name,
            }));
            res.json({ success: true, error: '', productAttributes });
        }).catch(error => {
            console.log(error);
            res.json({ success: false, error });
        });
});

route.get('/product_type', (req, res) => {
    attribute_md.getProductTypes()
        .then(results => {
            const productTypes = results.map(r => ({
                id: r.id,
                name: r.product_type_name,
                logo: r.icon_image
            }));
            res.json({ success: true, error: '', productTypes });
        }).catch(error => {
            console.log("error: ", error);
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        });
});

route.post('/product_type/add', (req, res) => {
    const { name } = req.body;
    attribute_md.addProductType(name)
        .then(result => {
            console.log('result: ', result);
            res.json({ success: true, id: result[0] });
        }).catch(error => {
            console.log("error: ", error);
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        });
});

route.post('/provider/add', (req, res) => {
    const { name } = req.body;
    attribute_md.addProvider(name)
        .then(result => {
            console.log('result: ', result);
            res.json({ success: true, id: result[0] });
        }).catch(error => {
            console.log("error: ", error);
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        });
});

route.post('/category/add', (req, res) => {
    const { name } = req.body;
    attribute_md.addProductAttribute(name)
        .then(result => {
            console.log('result: ', result);
            res.json({ success: true, id: result[0] });
        }).catch(error => {
            console.log("error: ", error);
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        });
});

route.post('/product_type_attribute/add', (req, res) => {
    const { product_type_id, category_attribute_id } = req.body;
    attribute_md.addProductTypeAttribute(product_type_id, category_attribute_id)
        .then(result => {
            console.log('result: ', result);
            res.json({ success: true, id: result[0] });
        }).catch(error => {
            console.log("error: ", error);
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        });
});

route.post('/product_type_attribute/delete', (req, res) => {
    const { product_type_id, category_attribute_id } = req.body;
    attribute_md.removeProductTypeAttribute(product_type_id, category_attribute_id)
        .then(result => {
            console.log('result: ', result);
            res.json({ success: true, result });
        }).catch(error => {
            console.log("error: ", error);
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        });
});

module.exports = route;
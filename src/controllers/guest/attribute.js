const express = require("express");
const attribute_md = require('../../models/attibuteModel');
const route = express.Router();

route.get('/', function(req, res){
    const product_type_id = parseInt(req.query.product_type_id);
    const category_name = req.query.category_name;
    console.log('input:', product_type_id);
    attribute_md.getAttributeValueBy(product_type_id, category_name).then( result =>{
        const attributes = result.map(attribute => ({
            product_attribute_id: attribute.product_attribute_id,
            value: attribute.value
        }));
        res.json({ success: true, error: '', attributes});
    }).catch( err=>{
        console.log("error: ", err);
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' })
    })
});

module.exports = route;
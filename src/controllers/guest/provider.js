const express = require("express");
const provider_md = require('../../models/providerModel');
const route = express.Router();

route.get('/', function(req, res){
    const product_type_id = parseInt(req.query.product_type_id);

    provider_md.getProvidersByProducType(product_type_id).then(result=>{
        const providers = result.map(provider => ({
            id: provider.id,
            name: provider.name
        }));
        res.json({ success: true, error: '', providers});
    }).catch(err=>{
        console.log("error: ", err);
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' })
    })
});

module.exports = route;
const express = require('express');
const user_md = require('../../models/userModel');

const route = express.Router();

route.get('/', (req, res) => {
    const user_id = parseInt(req.query.user_id);

    user_md.getUserBill(user_id).then(bills => {
        res.json({ success: true, error: '', bills });
    }).catch(error => {
        res.json({ success: false, error });
    })

})

module.exports = route;
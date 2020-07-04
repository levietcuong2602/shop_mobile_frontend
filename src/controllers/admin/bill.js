const express = require("express");
const bill_md = require('../../models/billModel');

const route = express.Router();

route.get('/pages', (req, res) => {
    const pageNum = parseInt(req.query.pageNum);
    const limit = parseInt(req.query.limit);
    const searchValue = req.query.searchValue;
    const filter = JSON.parse(req.query.filter);
    console.log(filter);
    bill_md.getBillAdminByPage(limit, pageNum, searchValue, filter).then(result => {
        const bills = result.data.map(r => ({
            id: r.id,
            customer_name: r.customer_name,
            shiper_name: r.shiper_name,
            destination_address: r.destination_address,
            book_date: r.book_date,
            delivery_date: r.delivery_date,
            ship_fee: r.ship_fee,
            bill_value: r.bill_value,
            status_order: r.status_order
        }));
        res.json({ success: true, error: '', bills, pager: result.pager });
    }).catch(error => {
        console.log(error);
        res.json({ success: false, error });
    });
});

route.get('/:id/detail', (req, res) => {
    let id = parseInt(req.params.id);

    bill_md.getBillDetailAdminById(id).then(bill => {
        console.log(bill);
        res.json({ success: true, error: '', bill });
    }).catch(error => {
        res.json({ success: true, error });
    });
});

module.exports = route;
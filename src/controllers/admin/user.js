const express = require("express");
const user_md = require('../../models/userModel');
const helper = require('../../helpers/helper');

const route = express.Router();

route.get('/pages', (req, res) => {
    const pageNum = parseInt(req.query.pageNum);
    const limit = parseInt(req.query.limit);
    const searchValue = req.query.searchValue;
    user_md.getUserByPage(limit, pageNum, searchValue).then(result => {
        const users = result.data.map(user => ({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address,
            level: user.level
        }));
        res.json({ success: true, error: '', users, pager: result.pager });
    }).catch(error => {
        console.log("error: ", error);
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' })
    });
});

route.post('/add', (req, res) => {
    const { user } = req.body;
    user['passwd'] = helper.hashPassword('12345678');
    user_md.addUser(user).then(user => {
        res.json({ success: true, error: '' });
    }).catch(error => {
        console.log("error: ", error);
        if (error.code == 'ER_DUP_ENTRY') {
            res.json({ success: false, error: 'Email đã được sử dụng' });
        } else {
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        }
    });
});

route.post('/delete', (req, res) => {
    const { id } = req.body;

    user_md.deleteUserById(id).then(result => {
        console.log("result: ", result);
        res.json({
            success: true,
            error: '',
            message: 'Xóa thành công'
        });
    }).catch(error => {
        console.log("error: ", error);
        res.json({
            success: false,
            error: 'Có lỗi xảy ra với CSDL'
        });
    });
});

module.exports = route;
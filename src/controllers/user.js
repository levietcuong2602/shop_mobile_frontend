const express = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user_md = require('../models/userModel');
const helper = require('../helpers/helper');

const route = express.Router();

route.use("/favorite", require(__dirname + "/user/favorite.js"));
route.use("/cart", require(__dirname + "/user/cart.js"));
route.use("/bill", require(__dirname + "/user/bill.js"));

route.get('/', (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    res.write("<h1>This is User page.</h1>");
    res.end();
});

route.post("/register", (req, res) => {
    let user = req.body;
    user.passwd = helper.hashPassword(user.passwd);

    // id, full_name, email, phone_number, address, level
    user_md.addUser(user).then(user => {
        user_md.getUserById(user[0]).then(user => {
            res.json({
                success: true,
                error: '',
                message: 'Thêm tài khoản thành công',
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    phone_number: user.phone_number,
                    address: user.address,
                    level: user.level
                }
            });
        }).catch(error => {
            console.log("error: ", error);
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        });

    }).catch(error => {
        console.log("error: ", error);
        if (error.code == 'ER_DUP_ENTRY') {
            res.json({ success: false, error: 'Email đã được sử dụng' });
        } else {
            res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
        }
    });
});

// LocalStrategy expects to find credentials in parameters named username and password
const localOptions = { usernameField: 'email', passwordField: 'passwd' };
passport.use(new LocalStrategy(localOptions,
    function (email, password, done) {
        user_md.getUserByEmail(email).then(user => {
            console.log('user: ', user);
            if (!user) {
                return done(null, false, { message: "Invalid email" })
            }
            if (!helper.comparePassword(password, user.passwd)) {
                return done(null, false, { message: "Invalid password" });
            }
            return done(null, {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone_number: user.phone_number,
                address: user.address,
                level: user.level
            });
        }).catch(error => done(error));
    }
));

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     user_md.getUserById(id, function (err, users) {
//         done(err, users[0]);
//     });
// });

route.post('/login', passport.authenticate('local', {
    session: false,
    failureFlash: true,
    successFlash: 'Welcome!'
}), (req, res) => {
    res.json({
        success: true,
        user: req.user,
        error: ''
    })
});

route.post('/update-password', (req, res) => {
    const { user_id, old_password, new_password } = req.body;

    user_md.updatePassword(user_id, old_password, new_password).then(result => {
        res.json({ success: true, result });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

route.post('/update-profile', (req, res) => {
    const { user_id, email, full_name, phone_number } = req.body;

    user_md.updateProfile(user_id, {
        email,
        full_name,
        phone_number
    }).then(result => {
        res.json({ success: true, result });
    }).catch(error => {
        res.json({ success: false, error });
    });
});

module.exports = route;
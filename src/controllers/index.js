const express = require('express');

const route = express.Router();

route.use("/api/admin", require(__dirname + "/admin.js"));
route.use("/api/user", require(__dirname + "/user.js"));
// route.use("/blog", require(__dirname + "/blog.js"));
route.use("/api/guest", require(__dirname + "/guest.js"));

route.get("/", (req, res) => {
    res.json({ "message": "This is Home page" });
});

module.exports = route;
const express = require("express");
const route = express.Router();

route.use("/productlist", require(__dirname + "/guest/product.js"));
route.use('/provider', require(__dirname + "/guest/provider.js"));
route.use('/attribute', require(__dirname+'/guest/attribute.js'))

route.get('/', (req, res) => {
    res.writeHead(200, { "Content-type": "text/html" });
    res.write("<h1>This is Admin page.</h1>");
    res.end();
});


module.exports = route;
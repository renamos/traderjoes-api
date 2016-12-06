var express = require('express');
var router = express.Router();
var product = require('../models/product-models.js')




// Add headers 
router.use(function (req, res, next) {
    console.log("hoola");
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


router.route('/create')
    .post(function (req, res) {
        var newProduct = new product();
        newProduct.name = req.body.name;
        newProduct.photo = req.body.photo;
        newProduct.price = req.body.price;
        newProduct.category_ID = req.body.category_ID;
        newProduct.description = req.body.description;
        newProduct.grams = req.body.grams;
        newProduct.seasonal = req.body.seasonal;
        newProduct.discontinued = req.body.discontinued;
        newProduct.type = req.body.type;
        newProduct.date_added = new Date();
        newProduct.save(function (err, product) {
            if (err) {
                console.log(err)
                return
            }

            res.json({
                message: 'New product has been created!',
                data: product
            })
        })
    });


router.route('/all')
    .get(function (req, res) {
        console.log('get /all')
        product.find(function (err, products) {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                data: products
            })
        })
    });

router.route('/delete/:id')
    .post(function (req, res) {
        product.remove({
            _id: req.params.id
        }, function (err, product) {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                message: 'Product successfully deleted!',
                ok: true
            });
        });
    });


module.exports = router
var express = require('express');
var router = express.Router();
var product = require('../models/product-models.js');
var faker = require('faker');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

// Add headers
router.use(function (req, res, next) {
    console.log("hoola");
    console.log(req.originalUrl);
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.orginalUrl == '/product/create') {
        var token = req.headers.authentication || req.headers.token;
        jwt.verify(token, secret, function (err) {
            if (err) {
                res.status(401).json(err);
                return false;
            }
            next();
        });
    }
    else {
        next();
    }
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


router.route('/create-fake')
    .post(function (req, res) {
        //faker
        var newProduct = new product();
        newProduct.name = faker.commerce.productName();
        newProduct.sku = faker.finance.account();
        newProduct.price = faker.commerce.price();
        newProduct.photo = faker.image.imageUrl();
        newProduct.category_ID = faker.commerce.product();
        newProduct.description = faker.lorem.sentence();
        newProduct.grams = faker.random.number();
        newProduct.seasonal = faker.random.boolean();
        newProduct.discontinued = faker.random.boolean();
        newProduct.type = faker.commerce.productMaterial();
        newProduct.date_added = faker.date.past();
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
        product.find(function (err, products) {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                data: products
            })
        }).sort("name")
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
                message: 'Product ID' + product + 'successfully deleted!',
                ok: true
            });
        });
    });


module.exports = router
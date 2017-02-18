var express = require('express');
var router = express.Router();
var category = require('../models/category-models.js')
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
        category.findOne({
                name: req.body.name
            },
            function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                if (data) {
                    res.json({
                        message: 'Category already exists!'
                    })
                } else {
                    var newCategory = new category();
                    newCategory.name = req.body.name;
                    newCategory.save(function (err, category) {
                        if (err) {
                            console.log(err)
                            return
                        }

                        res.json({
                            message: 'New category has been created!',
                            data: category
                        })
                    })

                }
            })
    });


router.route('/all')
    .get(function (req, res) {
        category.find(function (err, categories) {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                data: categories
            })
        }).sort("name")
    });

router.route('/delete/:id')
    .post(function (req, res) {
        product.findOne({
                category_ID: req.params.id
            },
            function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                if (data) {
                    res.json({
                        message: 'Product with category exists - cannot delete!'
                    })
                } else {
                    category.remove({
                        _id: req.params.id
                    }, function (err, category) {
                        if (err) {
                            console.log(err)
                            return
                        }
                        res.json({
                            message: 'Category successfully deleted!',
                            ok: true
                        });
                    });
                }
            })

    });


module.exports = router
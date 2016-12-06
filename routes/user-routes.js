var express = require('express');
var router = express.Router();
var userModel = require('../models/user-models.js')

router.route('/')
    .get(function (req, res) {
        res.json({
            message: 'Welcome to User Routes Get!'
        });
    })
    .post(function (req, res) {
        res.json({
            message: 'Welcome to User Routes Post!'
        });
    });

router.route('/create')
    .post(function (req, res) {
        //Check if email exists
        userModel.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                console.log(err)
                return
            }
            //User exists, so we send a message
            if (user) {
                res.json({
                    message: 'User already exists!'
                })
            }
            //User doesn't exists, so we create user
            var newUser = new userModel();
            newUser.username = req.body.username;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.city = req.body.city;
            newUser.state = req.body.state;
            newUser.save(function (err) {
                if (err) {
                    console.log(err)
                    return
                }

                res.json({
                    message: 'User has been created!'
                })

            })

        })

    });

router.route('/all')
    .get(function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                data: users
            })
        })
    });

router.route('/:id')
    .delete(function (req, res) {
        userModel.remove({
            _id: req.params.id
        }, function (err, bear) {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                message: 'Successfully deleted!'
            });
        });
    });

module.exports = router
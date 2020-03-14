const express = require('express');
const {createUser, loginUser, userProfile, forgetPassword, resetPassword} = require('../controller/user.controller');
const {validate} = require('../middleware/auth');


let router = express.Router();


router.post('/users', (req, res) => {

    createUser(req.body).then((data) => {
        res.status(201).send({success: data.success, data: data.data, status: 201, message: data.message})
    }, error => {
        res.status(error.status).send({success: false, error: error.error, status: error.status})
    })

});


router.post('/users/login', (req, res) => {

    loginUser(req.body).then((data) => {
        res.status(200).send({success: data.success, data: data.data, status: 200})
    }, error => {
        res.status(error.status).send({success: false, error: error.error, status: error.status})
    })

});


router.get('/users/profile', validate, (req, res) => {
    userProfile(req.user._id).then((data) => {
        res.status(200).send({success: data.success, data: data.data})
    }, error => {
        res.status(error.status).send({success: false, error: error.error})
    })
});


router.post('/users/forget-password', (req, res) => {

    forgetPassword(req.body).then((data) => {
        res.status(200).send({success: data.success, data: data.data, message: data.message})
    }, error => {
        res.status(error.status).send({success: false, error: error.error})
    })
});

router.post('/users/reset-password', (req, res) => {

    resetPassword(req.body).then((data) => {
        res.status(200).send({success: data.success, data: data.data, message: data.message})
    }, error => {
        res.status(error.status).send({success: false, error: error.error})
    })
});


module.exports = {router};

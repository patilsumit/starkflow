const express = require('express');
const {createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo} = require('../controller/todo.controller');
const {validate} = require('../middleware/auth');

let router = express.Router();


router.post('/todos', validate, (req, res) => {
    createTodo(req.body, req.user._id).then((data) => {
        res.status(201).send({success: data.success, data: data.data, message: data.message})
    }, error => {
        res.status(error.status).send({success: false, error: error.error})
    })
});


router.get('/todos', validate, (req, res) => {

    let limit = req.query.limit;

    let skip = req.query.skip;

    getAllTodo(limit, skip, req.user._id).then((data) => {
        res.status(200).send({success: data.success, data: data.data});
    }, error => {
        res.status(error.status).send({success: false, error: error.error, status: error.status});
    })

});


router.get('/todos/:id', validate, (req, res) => {

    let id = req.params.id;

    getTodoById(id).then((data) => {
        res.status(200).send({success: data.success, data: data.data});
    }, error => {
        res.status(error.status).send({success: false, error: error.error, status: error.status});
    })

});


router.put('/todos/:id', validate, (req, res) => {

    let id = req.params.id;

    updateTodo(req.body, id).then((data) => {
        res.status(200).send({success: data.success, message: data.message, status: 200});
    }, error => {
        res.status(error.status).send({success: false, error: error.error, status: error.status});
    })

});


router.delete('/todos/:id', validate, (req, res) => {

    let id = req.params.id;

    deleteTodo(id).then((data) => {
        res.status(200).send({success: data.success, message: data.message, status: 200});
    }, error => {
        res.status(error.status).send({success: false, error: error.error, status: error.status});
    })

});


module.exports = {router};

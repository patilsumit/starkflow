const {Todo} = require('../models/todo.model');

function checkRequiredFilled(postBody) {

    let message = '';
    if (postBody.todoTitle === '') {
        message = 'todoTitle is required';
    } else if (postBody.todoDescription === '') {
        message = 'todoDescription is required';
    } else {
        return false
    }
    return {message};

}


function checkTypeAttribute(postBody) {
    let validString = new RegExp('^[a-zA-Z\\- _]*$');


    let message = '';

    if (!validString.test(postBody.todoTitle)) {
        message = 'todoTitle Is Only String Allow';
    } else if (!validString.test(postBody.todoDescription)) {
        message = 'todoDescription is only String Allow';
    } else {
        return false;
    }

    return {message};

}

function checkTypeFilled(postBody) {
    let schemaDetails = Todo.schema.tree;

    let message = '';

    Object.keys(postBody).map((key) => {
        if (!schemaDetails[key]) {
            message = `${key} field not applicable`;
        }
    });

    if (message) {
        return {message}
    }
    return false;

}


function checkTodoStatus(postBody) {
    let todoStatus = ['completed', 'pending'];

    if (postBody.todoStatus === undefined) {
        return false
    } else {
        if (todoStatus.indexOf(`${postBody.todoStatus}`) > -1) {
            return false;
        }
        return {message: 'todoStatus Not Match'};
    }

}


module.exports = {checkRequiredFilled, checkTypeAttribute, checkTypeFilled,checkTodoStatus};

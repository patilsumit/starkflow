const {Todo} = require('../models/todo.model');
const {checkRequiredFilled, checkTypeAttribute, checkTypeFilled, checkTodoStatus} = require('../validators/todoValidators');
const {positive_number} = require('../validators/common.validators');


function createTodo(postBody, id) {
    let {todoTitle, todoDescription, todoStatus} = postBody;
    let todayDate = new Date();
    return new Promise((resolve, reject) => {

        let errorMessage = '';
        let checkFilled = checkTypeFilled(postBody);
        if (checkFilled) {
            errorMessage = checkFilled.message;
        }

        let requireCheck = checkRequiredFilled(postBody);
        if (requireCheck) {
            errorMessage = requireCheck.message;
        }

        let typeCheck = checkTypeAttribute(postBody);
        if (typeCheck) {
            errorMessage = typeCheck.message;
        }

        let checkStatus = checkTodoStatus(postBody);
        if (checkStatus) {
            errorMessage = checkStatus.message;
        }

        if (errorMessage) {
            return reject({success: false, error: errorMessage, status: 400})
        }

        let newTodo = new Todo({
            userId: id,
            todoTitle: todoTitle,
            todoDescription: todoDescription,
            todoStatus: todoStatus,
            createdAt: todayDate
        });

        newTodo.save((err, data) => {
            if (err) {
                return reject({success: false, error: err.message, status: 400})
            }
            return resolve({success: true, data: data, message: 'Todo Successfully Created'})
        })
    })

}

function getAllTodo(limit, skip, id) {

    return new Promise((resolve, reject) => {

        let queryCheck = positive_number(limit, skip);
        if (queryCheck) {
            return reject({success: false, error: queryCheck.message, status: 400})
        }

        let limitSize = parseInt(limit);

        let pageNo = parseInt(skip);

        Todo.countDocuments({userId: id}).exec((err, totalCount) => {
            Todo.find({userId: id})
                .limit(limitSize)
                .skip(pageNo)
                .exec((err, data) => {
                    if (err) {
                        return reject({success: false, error: err.message, status: 400});
                    }

                    if (!data) {
                        return reject({success: false, error: 'No User Found', status: 404});
                    }

                    let resData = {
                        data: data,
                        totalCount: totalCount

                    };
                    return resolve({success: true, data: resData})
                })
        })
    })
}

function getTodoById(id) {

    return new Promise((resolve, reject) => {

        Todo.findById(id).exec((err, data) => {
            if (err || !data) {
                return reject({success: false, error: 'Id Not Found', status: 404});
            }

            return resolve({success: true, data: data});
        })


    })
}


function updateTodo(postBody, id) {

    let {todoTitle, todoDescription, todoStatus} = postBody;

    let todayDate = new Date();

    return new Promise((resolve, reject) => {

        let errorMessage = '';
        let checkFilled = checkTypeFilled(postBody);
        if (checkFilled) {
            errorMessage = checkFilled.message;
        }

        let requireCheck = checkRequiredFilled(postBody);
        if (requireCheck) {
            errorMessage = requireCheck.message;
        }

        let typeCheck = checkTypeAttribute(postBody);
        if (typeCheck) {
            errorMessage = typeCheck.message;
        }

        let checkStatus = checkTodoStatus(postBody);
        if (checkStatus) {
            errorMessage = checkStatus.message;
        }

        if (errorMessage) {
            return reject({success: false, error: errorMessage, status: 400})
        }


        Todo.findOneAndUpdate({
            _id: id
        }, {
            todoTitle: todoTitle,
            todoDescription: todoDescription,
            todoStatus: todoStatus,
            updatedAt: todayDate
        }).exec((err, data) => {
            if (err || !data) {
                return reject({success: false, error: 'Id Not Found', status: 404});
            }

            return resolve({success: true, message: 'Todo Successfully Updated'});
        })

    })
}


function deleteTodo(id) {

    return new Promise((resolve, reject) => {

        Todo.findOneAndDelete({_id: id}).exec((err, data) => {
            if (err || !data) {
                return reject({success: false, error: 'Id Not Found', status: 404});
            }

            return resolve({success: true, message: 'Todo Deleted Successfully'});
        })
    })
}


module.exports = {createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo};






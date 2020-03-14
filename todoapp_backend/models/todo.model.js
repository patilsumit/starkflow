const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    todoTitle: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    todoDescription: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    todoStatus: {
        type: String,
        required: false
    },
    createdAt: {
        type: String,
        required: false
    },
    updatedAt: {
        type: String,
        required: false
    }
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo};

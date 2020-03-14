const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        lowercase: true,
        required: true,
    },
    userEmail: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,

    },
    userPassword: {
        hash: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        }
    },
    userStatus: {
        type: Number,
        trim: true,
        required: true,
    }

});


const User = mongoose.model('User', userSchema);

module.exports = {User};

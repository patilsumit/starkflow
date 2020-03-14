const jwt = require('jsonwebtoken');

require('dotenv').config();

function sign(ObjectID) {
    return new Promise((resolve, reject) => {
        let secret = process.env.JWT_SECRET;
        let payload = {
            user_id: ObjectID
        };

        let token = jwt.sign(payload, secret, {
            expiresIn: 30 * 24 * 60 * 60 // JWT expires in 30 days
        });
        resolve(token)
    })
}

function decode(token) {
    return new Promise((resolve, reject) => {
        let secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                reject('Invalid token');
            else
                resolve(decoded)
        })

    })
}


module.exports = {sign, decode};

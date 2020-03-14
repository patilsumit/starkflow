const {User} = require('../models/user.model');
const {decode} = require('../utils/crypto/jwt.util');

function validate(req, res, next) {
    /** Fetching details */
    let token = req.header('Authorization');


    if (!token) {
        return res.status(403).json({success: false, error: 'Token is Missing', status: 403})

    }

    /** Decoding JWT */
    decode(token).then((payload) => {
        User.findById(payload.user_id, '-__v -password').exec((err, doc) => {
            if (err || !doc) {
                return res.status(403).send({
                    success: false,
                    error: `Forbidden - You don't have enough permission to access this resource`,
                    status: 403
                })
            }

            req.user = doc;
            return next()
        })

    }).catch((err) => {
        return res.status(403).send({
            success: false,
            error: `Either the token is tampered or the session has been expired`,
            status: 403
        });
    })
}

module.exports = {validate};


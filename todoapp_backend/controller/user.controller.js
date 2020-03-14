const {User} = require('../models/user.model');
const {encrypt, compare} = require('../utils/crypto/hash.util');
const {sign, decode} = require('../utils/crypto/jwt.util');
const {userRequiredFiled, userCheckAttribute} = require('../validators/userValidators');
const {checkTypeField} = require('../validators/common.validators');
const nodeMailer = require('nodemailer');

let schemaDetails = User.schema.tree;


function createUser(postBody) {
    let {userName, userEmail, userPassword} = postBody;

    return new Promise((resolve, reject) => {

        let errorMessage = '';
        let checkRequire = userRequiredFiled(postBody);
        let checkAttribute = userCheckAttribute(postBody);
        let validFieldCheck = checkTypeField(postBody, schemaDetails);


        if (checkRequire) {
            errorMessage = checkRequire.message;
        } else if (checkAttribute) {
            errorMessage = checkAttribute.message;
        } else if (validFieldCheck) {
            errorMessage = validFieldCheck.message;
        }

        if (errorMessage) {
            return reject({success: false, error: errorMessage, status: 400})
        }


        User.findOne({
            userEmail: userEmail
        }).exec((err, result) => {
            if (err) {
                return reject({success: false, error: err.message, status: 400})
            }

            if (result) {
                return reject({success: false, error: 'User Email Already Exists', status: 409})
            }

            let newUser = new User({
                userName: userName,
                userEmail: userEmail,
                userPassword: encrypt(userPassword),
                userStatus: 1
            });

            newUser.save((err, data) => {
                if (err) {
                    return reject({success: false, error: err.message, status: 400})
                }

                return resolve({success: true, data: data, message: 'User Register Successfully'})
            })

        });
    })

}


function loginUser(postBody) {

    let {userEmail, userPassword} = postBody;

    return new Promise((resolve, reject) => {

        let errorMessage = '';
        let checkRequire = userRequiredFiled(postBody);
        let validFieldCheck = checkTypeField(postBody, schemaDetails);


        if (checkRequire) {
            errorMessage = checkRequire.message;
        } else if (validFieldCheck) {
            errorMessage = validFieldCheck.message;
        }

        if (errorMessage) {
            return reject({success: false, error: errorMessage, status: 400})
        }

        User.findOne({
            userEmail: userEmail
        }).exec((err, data) => {
            if (err) {
                return reject({success: false, error: err.message, status: 400})
            }

            if (!data) {
                return reject({success: false, error: 'Email Not Found', status: 400})
            }

            if (data.userStatus === 0) {
                return reject({success: false, error: 'Your Account Is Blocked', status: 401})
            }

            //403 Request Forbidden
            if (!compare(data.userPassword.hash, data.userPassword.salt, userPassword)) {
                return reject({success: false, error: 'userPassword is invalid', status: 403})
            }

            sign(data._id).then((token) => {
                let responseData = {
                    token,
                    userName: data.userName,
                    userEmail: data.userEmail
                };

                return resolve({success: true, data: responseData})
            })


        })
    })
}


function userProfile(id) {

    return new Promise((resolve, reject) => {

        User.findOne({
            _id: id
        }).exec((err, data) => {

            if (err) {
                return reject({success: false, error: err.message, status: 400})
            }

            if (!data) {
                return reject({success: false, error: 'No User Found', status: 404})
            }

            return resolve({success: true, data: data});
        })

    })
}


function forgetPassword(postBody) {

    let {userEmail} = postBody;

    return new Promise((resolve, reject) => {

        let errorMessage = '';
        let checkAttribute = userCheckAttribute(postBody);
        let validFieldCheck = checkTypeField(postBody, schemaDetails);


        if (userEmail === '') {
            errorMessage = 'userEmail is Required';
        } else if (checkAttribute) {
            errorMessage = checkAttribute.message;
        } else if (validFieldCheck) {
            errorMessage = validFieldCheck.message;
        }

        if (errorMessage) {
            return reject({success: false, error: errorMessage, status: 400})
        }

        User.findOne({
            userEmail: userEmail
        }).exec((err, data) => {

            if (err) {
                return reject({success: false, error: err.message, status: 400})
            }

            if (!data) {
                return reject({success: false, error: 'Email Not Found', status: 404})
            }

            if (data.userStatus === 0) {
                return reject({success: false, error: 'Your Account Is Blocked', status: 401})
            }
            sign(data._id).then((token) => {
                let response_data = {
                    token
                };

                let transporter = nodeMailer.createTransport({

                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });

                let mailOptions = {
                    from: 'patilsumit2020@gmail.com',
                    to: userEmail,
                    subject: 'Forget Password Reset Link',
                    text: 'Click on this Link',
                    html:
                        '<h4><b>Reset Password</b></h4>' +
                        '<p>To reset your password, complete this form:</p>' +
                        ' http://localhost:4200/users/reset-password?token=' + token + '">' +
                        '<br><br>' +
                        '<p>--Team Todo</p>'
                };

                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        console.log('Error occurs', err);
                    } else {
                        console.log('Email sent!!!');
                    }
                });

                return resolve({success: true, data: response_data, message: 'Email Sent Successfully'})
            });

        })


    })

}

function resetPassword(postBody) {

    let {userPassword, token} = postBody;

    let decodeToken = decode(token);

    return new Promise((resolve, reject) => {

        if (userPassword === '' || userPassword === undefined) {
            return reject({success: false, error: 'userPassword is required', status: 400})
        } else if (token === '' || token === undefined) {
            return reject({success: false, error: 'Token is required', status: 400})
        }

        decodeToken.then((result) => {
            let decodeID = result.user_id;
            User.findOneAndUpdate({
                _id: decodeID
            }, {
                'userPassword': encrypt(userPassword)
            }).exec((err, data) => {
                if (err) {
                    return reject({success: false, error: err.message})
                }
                if (!data) {
                    return reject({success: false, error: 'Id Not Found', status: 404})
                }
                return resolve({success: true, data: data.userPassword, message: 'Password Update Successfully'})
            })
        }, error => {
            return reject({success: false, error: error, status: 400,})
        })


    })

}


module.exports = {createUser, loginUser, userProfile, forgetPassword, resetPassword};

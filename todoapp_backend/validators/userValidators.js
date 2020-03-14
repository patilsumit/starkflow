const {response, handleError, MongooseErrorHandle} = require('../utils/response.util');


function userRequiredFiled(postBody) {

    let message = '';

    if (postBody.userName === '') {
        message = 'username  is Required';
    } else if (postBody.userEmail === '') {
        message = 'userEmail is Required';
    } else if (postBody.userPassword === '') {
        message = 'userPassword is Required';
    } else {
        return false
    }

    return {message};
}


function userCheckAttribute(postBody) {

    let message = '';
    let validString = new RegExp('^[a-zA-Z\\-_]*$');
    let validEmail = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    let validPassword = new RegExp('^([a-zA-Z\\-@[0-9])*$');

    if(postBody.userEmail === undefined){
      return  false
     }

    if (!validString.test(postBody.userName)) {
        message = 'User Name  only string allow';
    } else if (!validEmail.test(postBody.userEmail)) {
        message = 'User Email Format is Invalid';
    } else if (!validPassword.test(postBody.userPassword)) {
        message = 'User Password Format is Invalid';
    } else {
        return false
    }
    // }


    return {message};
}


module.exports = {userRequiredFiled, userCheckAttribute};

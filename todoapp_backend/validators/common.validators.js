
function checkTypeField(postBody,schemaDetails) {

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


function positive_number(limit, skip) {
    let message = '';
    let numRegx = new RegExp('^\d*[0-9]\\d*$');

    if (!numRegx.test(limit)) {
        message = 'Limit Type Invalid';
    } else if (!numRegx.test(skip)) {
        message = 'Skip Type Invalid';
    } else {
        return false
    }

    return {message};
}


module.exports = {checkTypeField, positive_number};

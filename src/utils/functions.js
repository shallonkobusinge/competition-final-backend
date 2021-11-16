const bcrypt = require('bcryptjs');


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const SUCCESS_RESPONSE_MESSAGE = (data = null, message = "", status = 200) => {
    return { status: status, success: true, data, message };
}

const ERROR_RESPONSE_MESSAGE = (err = null, message = "INTERNAL SERVER ERROR", status = 500) => {
    return { status: status, success: false, error: err, message };
}



module.exports = {
    hashPassword,
    SUCCESS_RESPONSE_MESSAGE,
    ERROR_RESPONSE_MESSAGE
}
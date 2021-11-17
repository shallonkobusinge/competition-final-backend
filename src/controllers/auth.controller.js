const { User, validateLogin } = require('../models/users.model');
const { ERROR_RESPONSE_MESSAGE, SUCCESS_RESPONSE_MESSAGE, hashPassword } = require('../utils/functions');
const bcrypt = require('bcryptjs')

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.AUTH_USER?._id);
        if (!user) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'User not found'));
        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(user));
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(null, err.toString()));
    }
}


const login = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, error.details[0].message));

        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'Invalid Credentials'));

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'Invalid Credentials'));

        const AUTH_DATA = {
            token: user.generateAuthToken(),
            _id: user._id,
            username: user.username,
            userType: user.userType,
        };

        return res.status(201).send(SUCCESS_RESPONSE_MESSAGE(AUTH_DATA));
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(null, err.toString()));
    }
}

module.exports = {
    login, getCurrentUser
};
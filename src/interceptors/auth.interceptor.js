const jwt = require('jsonwebtoken');
const { User } = require('../models/users.model');
const { ERROR_RESPONSE_MESSAGE } = require('../utils/functions');

const SECRET_KEY = process.env.SECRET_KEY;
const AUTH_INTERCEPTOR = async (req, res, next) => {

    const header = req.header('Authorization');

    if (!header)
        return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'Authorization Headers not provided'));

    if (!(header.startsWith("Bearer ")))
        return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'Invalid Token Format'));

    const token = header.split(' ')[1];
    console.log(token);
    try {
        const decoded = jwt.verify(token, SECRET_KEY);


        const user = await User.findById(decoded._id);

        req.AUTH_USER = user;

        next();
    }
    catch (err) {
        console.error(err);
        return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, err.toString()));
    }
}


module.exports = { AUTH_INTERCEPTOR }
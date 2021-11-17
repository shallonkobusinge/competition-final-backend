const { User, validate, validateUpdate } = require('../models/users.model');
const { ERROR_RESPONSE_MESSAGE, SUCCESS_RESPONSE_MESSAGE, hashPassword } = require('../utils/functions');
const { EUserType } = require('../enums');


const getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(users));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(err.toString()));
    }
};

const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'NOT FOUND'));

        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(user));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(err.toString()));
    }
};




const create = async (req, res) => {
    try {
        console.log("reached")
        const { error } = validate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE_MESSAGE(error.details[0].message, 'VALIDATION ERROR'));

        req.body.password = await hashPassword(req.body.password);
        req.body.userType = EUserType.ADMIN;

        const user = new User(req.body);
        const saved = await user.save();

        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(err.toString()));
    }
};


const update = async (req, res) => {
    try {
        const { error } = validateUpdate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE_MESSAGE(error.details[0].message, "VALIDATION ERROR"));
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'NOT FOUND'));

        user.fullNames = req.body.fullNames;
        user.email = req.body.email;

        const updated = await user.save();


        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(updated));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(err.toString()));
    }
};


const deleting = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'NOT FOUND'));

        const deleted = await User.findByIdAndDelete(user._id);


        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(err.toString()));
    }
};




module.exports = {
    getAll, getById, create, update, deleting
}
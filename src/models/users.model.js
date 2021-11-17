const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = mongoose.Schema({
    fullNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nationalId: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"],
        required: true
    },
    userType: {
        type: String,
        enum: ["ADMIN", "USER"],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    }
});
userSchema.plugin(timestamps);
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userType: this.userType
    }, SECRET_KEY);
};


const User = mongoose.model('User', userSchema);


const validate = (data) => {
    const schema = {
        fullNames: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        nationalId: Joi.string().min(16).max(16).required(),
        gender: Joi.string().valid("MALE", "FEMALE").required(),
        password: Joi.string().min(5).required()
    }
    //   star: Joi.number().integer().min(1).max(5).required(),
    // student: {
    //     type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Student',
    //             required: true
    // },

    return Joi.validate(data, schema);

}

const validateLogin = (data) => {
    const schema = {
        email: Joi.string().required(),
        password: Joi.string().required()
    }

    return Joi.validate(data, schema);

}


module.exports = {
    User,
    validate,
    validateLogin
}
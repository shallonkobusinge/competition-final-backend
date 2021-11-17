const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Joi = require('joi');
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




});
userSchema.plugin(timestamps);



const Employee = mongoose.model('Employee', userSchema);

const validate = (data) => {
    const schema = {
        fullNames: Joi.string().regex(/^([^0-9]*)$/).required(),
        email: Joi.string().regex(/^([^0-9]*)$/).email().required(),
    }


    return Joi.validate(data, schema);

}

const validateUpdate = (data) => {
    const schema = {
        fullNames: Joi.string().min(3),
        email: Joi.string().email(),

    }
    return Joi.validate(data, schema);

}


module.exports = {
    Employee,
    validate,
    validateUpdate
}
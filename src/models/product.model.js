const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Joi = require('joi');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    exportation_date: {
        type: Date,
        required: true,
    },
    expiration_date: {
        type: Date,
        required: true,
    },
    unit_price: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true

    },
    productType: {
        type: String,
        enum: ["EXPORTED", "NOT_EXPORTED"]
    }

});
productSchema.plugin(timestamps)
const Product = mongoose.model('Product', productSchema);



const validateProduct = (data) => {

    const schema = {
        name: Joi.string().regex(/^([^0-9]*)$/).required(),
        quantity: Joi.required(),
        exportation_date: Joi.required(),
        expiration_date: Joi.required(),
        unit_price: Joi.string().required(),
        company: Joi.string().regex(/^([^0-9]*)$/).required()
    }
    return Joi.validate(data, schema);
}



module.exports = {
    Product,
    validateProduct
}


const { Product, validateProduct } = require('../models/product.model')
const { EProductType } = require('../enums')

const { ERROR_RESPONSE_MESSAGE, SUCCESS_RESPONSE_MESSAGE, hashPassword } = require('../utils/functions');
const createProduct = async (req, res) => {
    console.log(req.body)
    try {
        const { error } = validateProduct(req.body)
        if (error) return res.status(400).send(ERROR_RESPONSE_MESSAGE(error.details[0].message, "VALIDATION ERROR"))
        req.body.productType = EProductType.EXPORTED;
        const product = await new Product(req.bod6y)
        const saved = await product.save()
        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(saved))
    }
    catch (error) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(error.toString()))
    }

}


const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(500).send(ERROR_RESPONSE_MESSAGE(null, "PRODUCT NOT FOUND"))

        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(product))

    }
    catch (error) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(error.toString()))
    }
}
const getProductsByType = async (req, res) => {
    try {
        const products = await Product.find({ productType: req.params.type })
        if (!products) return res.status(500).send(ERROR_RESPONSE_MESSAGE(null, "PRODUCT NOT FOUND"))
        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(products))

    } catch (error) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(error.toString()))
    }
}
const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(products));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(err.toString()));
    }
}


const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
        if (!product) return res.status(500).send(ERROR_RESPONSE_MESSAGE(null, "PROUDCT NOT FOUND"))
        const deleted = await User.findByIdAndDelete(user._id);

        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(null, 'Product Deleted Successfully'));
    }
    catch (error) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(error.toString()))
    }

}


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(400).send(ERROR_RESPONSE_MESSAGE(null, "NOT FOUND"))
        product.name = req.body.name,
            product.quantity = req.body.quantity,
            product.exportation_date = req.body.exportation_date,
            product.expiration_date = req.body.expiration_date,
            product.unit_price = req.body.unit_price,
            product.productType = req.body.productType,
            proudct.company = req.body.company
        const updated = await product.save()
        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(updated))
    }
    catch (error) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(error.toString()))
    }

}

module.exports = {
    updateProduct,
    deleteProduct,
    getAll,
    getById,
    createProduct,
    getProductsByType
}
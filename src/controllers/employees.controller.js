const { Employee, validate } = require('../models/Employee.model');
const { ERROR_RESPONSE_MESSAGE, SUCCESS_RESPONSE_MESSAGE } = require('../utils/functions');


const getAll = async (req, res) => {
    try {
        const users = await Employee.find();
        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(users));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(err.toString()));
    }
};

const getById = async (req, res) => {
    try {
        const user = await Employee.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'NOT FOUND'));

        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(user));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(err.toString()));
    }
};

const createEmployee = async (req, res) => {
    console.log(req.body)
    console.log("reached")
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(ERROR_RESPONSE_MESSAGE(error.details[0].message, 'VALIDATION ERROR'));


        const user = new Employee(req.body)
        const saved = await user.save()

        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(saved));

    } catch (error) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(error.toString()))

    };
}


const updateEmployee = async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(ERROR_RESPONSE_MESSAGE(error.details[0].message, 'VALIDATION ERROR'));
        const user = await Employee.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'NOT FOUND'));

        user.fullNames = req.body.fullNames;
        user.email = req.body.email;

        const updated = await user.save()
        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(updated));


    } catch (error) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(error.toString))
    }
}


const deleteEmployee = async (req, res) => {

    try {
        const user = await Employee.findById(req.params.id)
        if (!user) return res.status(404).send(ERROR_RESPONSE_MESSAGE(null, 'NOT FOUND'));
        const deleted = await Employee.findByIdAndDelete(user._id);

        return res.status(200).send(SUCCESS_RESPONSE_MESSAGE(null, 'Employee Deleted Successfully'));

    }
    catch (error) {
        return res.status(500).send(ERROR_RESPONSE_MESSAGE(error.toString()))
    }
}

module.exports = {
    getAll,
    getById,
    updateEmployee,
    deleteEmployee,
    createEmployee

}
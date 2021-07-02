const Role = require('../models/role')
const User = require('../models/user')


const roleValidation = async (role = '') => {
    const exists = await Role.findOne({ role });
    if (!exists) {
        throw new Error(`${role} not exists`);
    }
}

const emailValidation = async (mail = '') => {
    const emailExists = await User.findOne({ mail });
    if (emailExists) {
        throw new Error('Email alredy exists');
    }
}

const idExistsValidation = async (id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`id ${id} not exists`);
    }
}

module.exports = {
    roleValidation,
    emailValidation,
    idExistsValidation
}
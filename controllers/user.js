const { request, response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user')

const userGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: 'Get API - Controller',
        query
    });
}

const userPost = async (req, res = response) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }

    let { name, mail, password, role } = req.body;
    let user = new User({ name, mail, password, role });

    //verificamos si el correo existe
    const emailExists = await User.findOne({ mail });
    if (emailExists) {
        return res.status(400).json({
            error: 'Email alredy exists'
        })
    }

    await user.save();

    res.json({
        user
    });
}

const userPut = (req, res = response) => {
    let id = req.params.id;
    res.json({
        msg: 'Put API - Controller',
        id: id
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - Controller'
    });
}

module.exports = { userGet, userPost, userPut, userDelete }
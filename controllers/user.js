const { request, response } = require('express');
const User = require('../models/user')

const userGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: 'Get API - Controller',
        query
    });
}

const userPost = async (req, res = response) => {

    let { id, name, mail, password, role } = req.body;
    let newUser = new User({ id, name, mail, password, role });

    await newUser.save();

    res.json({
        msg: `User ${newUser.id} created`,
    });
}

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...args } = req.body;

    //TODO: validar contra base de datos
    const dbUser = await User.findByIdAndUpdate(id, args);

    res.json({
        msg: `User ${id} updated`,
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - Controller'
    });
}

module.exports = { userGet, userPost, userPut, userDelete }
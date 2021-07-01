const { request, response } = require('express')
const User = require('../models/user')

const userGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: 'Get API - Controller',
        query
    });
}

const userPost = async (req, res = response) => {
    let body = req.body;
    let user = new User(body);

    await user.save();

    res.json({
        msg: 'Post API - Controller',
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
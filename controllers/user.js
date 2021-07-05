const { request, response } = require('express');
const User = require('../models/user');

const userGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    const [total, users] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true }).skip(Number(from)).limit(Number(limit))
    ])

    res.json({
        total, users
    });
}

const userPost = async (req, res = response) => {

    let { id, name, mail, password, role } = req.body;
    let newUser = new User({ id, name, mail, password, role });

    await newUser.save();

    res.json({
        msg: `User ${newUser.id} created`
    });
}

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...args } = req.body;

    const dbUser = await User.findByIdAndUpdate(id, args);

    res.json({
        msg: `User ${id} updated`
    });
}

const userDelete = async (req, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: `User deleted`
    });
}

module.exports = { userGet, userPost, userPut, userDelete }
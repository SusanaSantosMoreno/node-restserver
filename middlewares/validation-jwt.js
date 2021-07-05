const { response, request } = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Cannot find token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);

        let user = await User.findById(uid);
        req.user = user;

        //verificamos si el uid tiene estado en true
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token not valid - status: false'
            });
        }

        //verificamos que el usuario exista
        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - user not exists'
            });
        }

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token not valid'
        })
    }
};

module.exports = {
    validateJWT
}
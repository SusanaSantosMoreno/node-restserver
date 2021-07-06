const { response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user')

const login = async (req, res = response) => {

    const { mail, password } = req.body;

    try {

        const user = await User.findOne({ mail });
        //validamos email
        if (!user) {
            return res.json({
                status: false,
                msg: 'user / password are wrong, the mail not exists'
            });
        }
        //validamos estado
        if (!user.status) {
            return res.json({
                status: false,
                msg: 'user / password are wrong, status: false'
            });
        }
        //validamos contraseña
        if (user.password !== password) {
            return res.json({
                status: false,
                msg: 'user / password are wrong, password is incorrect'
            });
        }

        //generar el token
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login ok',
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong, contact the administrator'
        });
    }
}

module.exports = {
    login
}
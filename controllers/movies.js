const { request, response } = require('express')

const moviesGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: 'Get API - Controller',
        query
    });
}

const moviesPost = (req, res = response) => {
    let { nombre, edad } = req.body;
    res.json({
        msg: 'Post API - Controller',
        nombre,
        edad
    });
}

const moviesPut = (req, res = response) => {
    let id = req.params.id;
    res.json({
        msg: 'Put API - Controller',
        id: id
    });
}

const moviesDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - Controller'
    });
}

module.exports = { moviesGet, moviesPost, moviesPut, moviesDelete }
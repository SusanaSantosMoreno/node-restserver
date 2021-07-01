
const { Router } = require('express');
const { moviesGet, moviesPost, moviesPut, moviesDelete } = require('../controllers/movies');

const router = Router();

router.get('/', moviesGet);

router.post('/', moviesPost);

router.put('/:id', moviesPut);

router.delete('/', moviesDelete);

module.exports = router;
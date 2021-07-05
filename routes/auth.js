const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const { validateFields } = require('../middlewares/validations');

const router = Router();

router.post('/login',
    check('mail', 'mail is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
    , login);

module.exports = router;
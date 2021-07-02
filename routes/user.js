
const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const { roleValidation, emailValidation } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validations');


const router = Router();

router.get('/', userGet);

router.post('/', [
    check('mail', 'invalid email').isEmail(),
    check('name', "name can't be empty").not().isEmpty(),
    check('password', "password can't be empty, min 6 letters").isLength({ min: 6 }),
    //check('role', 'role is not allowed').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('mail').custom(emailValidation),
    check('role').custom(roleValidation),
    validateFields
], userPost);

router.put('/:id', userPut);

router.delete('/', userDelete);

module.exports = router;
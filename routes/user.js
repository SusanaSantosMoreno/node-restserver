
const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const { roleValidation, emailValidation, idExistsValidation } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validations');
const { validateJWT } = require('../middlewares/validation-jwt')


const router = Router();

{
    /**
     * @swagger
     *  components:
     *      schemas:
     *          User:
     *              type: object
     *              required:
     *                  - name
     *                  - mail
     *                  - password
     *                  - role
     *              properties:
     *                  id: 
     *                      type: string
     *                      description: The auto-generated id of the user
     *                  name: 
     *                      type: string
     *                      description: The user name
     *                  mail: 
     *                      type: string
     *                      description: The user email
     *                  password:
     *                      type: string
     *                      description: The user password
     *                  img:
     *                      type: string
     *                      description: The user image
     *                  role:
     *                      type: string
     *                      description: The user role
     *                  status:
     *                      type: boolean
     *                      description: Specifies if the user has been removed
     *                  google:
     *                      type: boolean
     *                      description: Specifies if the user has authenticated with google
     *               example:
     *                  id: 60deed24f05fdd2fe7efe3be
     *                  name: Hedwig H. Rollins
     *                  password: dnkdgi23dsfbds
     *                  img: img.png
     *                  role: USER_ROLE
     *                  status: true
     *                  google: false
     */
}

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

router.put('/:id', [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(idExistsValidation),
    check('role').custom(roleValidation),
    validateFields
], userPut);

router.delete('/:id', [
    validateJWT,
    check('id', 'invalid id').isMongoId(),
    check('id').custom(idExistsValidation),
    validateFields
], userDelete);

module.exports = router;
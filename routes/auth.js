/*
    Auth route
    /api/auth
*/
const { Router } = require('express')
const { createUser, loginUser, renewToken } = require('../controllers/auth')
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/field-validators');

const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.post( 
    '/new', 
    [ 
        // middlewares
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'El password debe tener como minimo 6 caracteres.').isLength({min: 6}),
        fieldValidator
    ], 
    createUser 
);

router.post(
    '/',
    [
        // middlewares
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'El password debe tener como minimo 6 caracteres.').isLength({min: 6}),
        fieldValidator
    ],
    loginUser 
);

router.get('/renew', validateJWT, renewToken )


module.exports = router;

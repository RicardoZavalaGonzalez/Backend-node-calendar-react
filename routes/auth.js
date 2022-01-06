/* Rutas de usuarios
host + api/auth */
const { Router } = require('express');
const { check } = require('express-validator');
// Metodos del controlador
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/AuthController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJwt } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    // middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

router.get('/renew', validateJwt, revalidarToken);

module.exports = router;
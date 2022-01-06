/* 
    Event Routes
    /api/events
 */
const { Router } = require('express');
const { validateJwt } = require('../middlewares/validate-jwt');
const { index, create, update, destroy } = require('../controllers/EventController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
// Proteccion de rutas por grupo /* midleware validateJwt */
router.use(validateJwt);

router.get('/', index)
router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
], create);
router.put('/:id', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
], update);
router.delete('/:id', destroy);

module.exports = router
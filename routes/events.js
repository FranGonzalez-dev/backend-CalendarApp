/*
    Event route
    /api/events
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');


const router = Router()

router.use( validateJWT );

// Obtener eventos
router.get('/', getEvents);

// Crear evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        fieldValidator
    ],
    createEvent
)

// Actualizar evento
router.put('/:id', updateEvent)

// Eliminar eventos
router.delete('/:id', deleteEvent)

module.exports = router;
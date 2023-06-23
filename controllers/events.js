const { response } = require('express')
const Event = require('../models/event.model.js')


const getEvents = async ( req, res = response ) => {

    const events = await Event.find().populate('user', 'name')

    res.status(200).json({
        ok: true,
        events
    })
}


const createEvent = async ( req, res = response ) => {

    const event = new Event( req.body )

    try {
        event.user = req.uid;
        const savedEvent = await event.save()
        res.status(201).json({
            ok: true,
            event: savedEvent
        })
    } catch (error) {
        console.log(error);
        res.status( 500 ).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

    
}

const updateEvent = async ( req, res = response ) => {

    const eventID = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById( eventID )

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status( 401 ).json({
                ok: false,
                msg: 'El usuario no esta autorizado para editar este evento.'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventID, newEvent );

        res.status(200).json({
            ok: true,
            event: updatedEvent
        })

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const deleteEvent = async ( req, res = response ) => {

    const eventID = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById( eventID )

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status( 401 ).json({
                ok: false,
                msg: 'El usuario no esta autorizado para eliminar este evento.'
            })
        }

        await Event.findByIdAndDelete( eventID );

        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado'
        })

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getEvents, createEvent, updateEvent, deleteEvent
}
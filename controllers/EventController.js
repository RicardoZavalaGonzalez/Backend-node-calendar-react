const { response } = require("express");
const Event = require("../models/Event");

const index = async (req, res = response) => {
    try {
        const events = await Event.find().populate('user', 'name');
        res.json({
            ok: true,
            events
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

const create = async (req, res = response) => {
    try {
        const event = new Event(req.body);
        event.user = req.uid;
        const savedEvent = await event.save();
        res.json({
            ok: true,
            event: savedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Contacte al administrador'
        })
    }
}

const update = async (req, res = response) => {
    try {
        const eventId = req.params.id;
        const uid = req.uid;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para modificar este evento'
            });
        }
        const newEvent = { ...req.body, user: uid }
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });
        res.json({
            ok: true,
            evento: updatedEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

const destroy = async (req, res = response) => {
    try {
        const eventId = req.params.id;
        const uid = req.uid;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para modificar este evento'
            });
        }
        await Event.findByIdAndDelete(eventId);
        res.json({
            ok: true,
            msg: 'Evento eliminado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admnistrador'
        })
    }
}

module.exports = { index, create, update, destroy }
const { Schema, model } = require("mongoose");

const Event = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    // registrando al usuario que crea el registro
    /* una llave foranea */
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

Event.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Event', Event);
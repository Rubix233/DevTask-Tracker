const mongoose = require('mongoose');

// Definimos cómo va a ser el "esqueleto" de una tarea en la base de datos definido en la especificación de la tarea
const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    //Descripción de la tarea no aparece en las especificaciones pero entiendo que es necesario
    descripcion: {
        type: String,
        required: false
    },
    tecnologia: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// Exportamos el modelo para poder usarlo en los servicios
module.exports = mongoose.model('Task', taskSchema);

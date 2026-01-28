const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Aquí definimos los puntos de entrada (endpoints) de nuestra API
router.get('/', taskController.getTasks); // Para listar
router.post('/', taskController.createTask); // Para guardar
router.delete('/:id', taskController.deleteTask); // Para borrar por ID

module.exports = router;

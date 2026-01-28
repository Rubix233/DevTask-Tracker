const taskService = require('../services/taskService');

// Función para pillar todas las tareas y mandarlas al frontend
const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        // Si todo va bien, respondemos con un JSON que contiene la lista de tareas.
        res.json(tasks);
    } catch (err) {
        // Si ocurre algún error durante la obtención de tareas,
        // respondemos con un estado 500 (Internal Server Error)
        // y un mensaje de error.
        res.status(500).json({ message: err.message });
    }
};

// Aquí pillamos los datos del formulario y creamos la tarea
// Si todo sale bien, respondemos con un 201 (que significa "creado" con éxito)
const createTask = async (req, res) => {
    try {
        const newTask = await taskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        // Si hay algún fallo (ej: falta el título), devolvemos un 400 (petición incorrecta)
        res.status(400).json({ message: err.message });
    }
};

// Esta función se encarga de borrar la tarea usando el ID que nos pasan
// Si no existe, lanzamos un 404 (no encontrado), si no un 500 (error del servidor)
const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        // Comprobamos el tipo de fallo para dar un código de error acorde
        const status = err.message === 'Task not found' ? 404 : 500;
        res.status(status).json({ message: err.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    deleteTask
};

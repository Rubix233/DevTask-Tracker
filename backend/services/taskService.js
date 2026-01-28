const Task = require('../models/Task');

// Buscamos todas las tareas en la base de datos y las ordenamos por fecha
// Usamos { fecha: -1 } para que las más nuevas salgan primero (orden descendente)
const getAllTasks = async () => {
    return await Task.find().sort({ fecha: -1 });
};

// Guardamos una nueva tarea con los datos que nos llegan
const createTask = async (taskData) => {
    const task = new Task(taskData);
    return await task.save();
};

// Buscamos la tarea por su ID y la mandamos a paseo (la borramos)
const deleteTask = async (id) => {
    const task = await Task.findById(id);
    if (!task) throw new Error('Task not found');
    return await task.deleteOne();
};

module.exports = {
    getAllTasks,
    createTask,
    deleteTask
};

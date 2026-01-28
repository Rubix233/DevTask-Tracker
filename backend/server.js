const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuramos los middlewares básicos (funciones que procesan la petición antes de llegar a las rutas)
app.use(cors()); // CORS nos permite que el frontend (desde su puerto) pueda hablar con el servidor sin bloqueos de seguridad
app.use(express.json()); // Para que el servidor entienda la información que le enviamos en formato JSON
app.use(express.static('../frontend')); // La carpeta 'frontend' (antes public) contiene nuestro sitio web (HTML, CSS y JS)

// Nos conectamos a la base de datos de MongoDB Atlas usando la URL que guardamos en el archivo .env por seguridad
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Enlazamos las rutas de las tareas para que el servidor sepa qué hacer cuando alguien pide /api/tasks
app.use('/api/tasks', taskRoutes);

// Ponemos al servidor a escuchar en el puerto configurado (normalmente el 3000)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

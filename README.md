# DevTask Tracker - Monolito Artesanal

Este proyecto es una aplicación de gestión de tareas (To-Do List) diseñada para desarrolladores, construida con una arquitectura de **Monolito Artesanal** utilizando Node.js, Express y MongoDB.

## 🚀 Cómo empezar

Sigue estas instrucciones para tener una copia del proyecto en funcionamiento en tu máquina local.

### 📋 Prerrequisitos

Necesitas tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- Una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (o una instancia local de MongoDB)

### 🔧 Instalación

1. **Clona el repositorio** (si aplica) o descarga los archivos en tu máquina local.

2. **Instala las dependencias del backend:**
   Navega a la carpeta `backend` desde la terminal y ejecuta:
   ```bash
   cd backend
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo llamado `.env` dentro de la carpeta `backend` (puedes usar el archivo `.env` existente como referencia o crearlo de cero).
   Asegúrate de que contenga tu URI de conexión a MongoDB:
   ```env
   MONGODB_URI=tu_cadena_de_conexion_a_mongodb_atlas
   PORT=3000
   ```

### 🛰️ Ejecución del proyecto

Para arrancar el servidor backend y servir la aplicación frontend:

1. Asegúrate de estar en la carpeta `backend`.
2. Ejecuta el siguiente comando:
   ```bash
   node server.js
   ```
3. Abre tu navegador y accede a: `http://localhost:3000`

---

## 📁 Estructura del Proyecto

El proyecto sigue un patrón de diseño **Controller-Service** para mantener el código organizado y fácil de escalar:

```text
/
├── backend/                # Lógica del servidor y API
│   ├── controllers/        # Controladores que manejan las peticiones HTTP
│   ├── models/             # Modelos de datos (Mongoose Schemas)
│   ├── routes/             # Definición de rutas de la API
│   ├── services/           # Lógica de negocio reusable
│   ├── server.js           # Punto de entrada de la aplicación
│   └── .env                # Configuración de entorno (¡no lo subas a Git!)
├── frontend/               # Lado del cliente (Interfaz de usuario)
│   ├── index.html          # Estructura principal
│   ├── style.css           # Estilos de la aplicación
│   └── script.js           # Lógica de interacción y llamadas a la API
└── README.md               # Este archivo :)
```

---

## 🛠️ Tecnologías utilizadas

- **Backend:** Node.js, Express, Mongoose (MongoDB).
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Base de Datos:** MongoDB Atlas.

## 📝 Notas sobre la Arquitectura

Este proyecto utiliza el enfoque de **Monolito Artesanal**, lo que significa que el servidor backend no solo gestiona la API sino que también sirve los archivos estáticos del frontend directamente desde la carpeta `../frontend`. Esto simplifica enormemente el despliegue inicial y la comunicación entre partes.

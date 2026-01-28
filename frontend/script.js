document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const saveBtn = document.getElementById('save-btn');

    // Vamos a buscar las tareas al servidor usando fetch (una petición HTTP GET)
    async function fetchTasks() {
        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            renderTasks(tasks); // Una vez las tenemos, las pintamos en la pantalla
        } catch (err) {
            console.error('Error fetching tasks:', err);
            taskList.innerHTML = '<div class="loader">Error al cargar tareas.</div>';
        }
    }

    // Aquí es donde dibujamos cada tarea en el HTML dinámicamente
    function renderTasks(tasks) {
        if (tasks.length === 0) {
            taskList.innerHTML = '<div class="loader">No hay tareas pendientes.</div>';
            return;
        }

        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <div class="task-header">
                    <h3 class="task-title">${task.titulo}</h3>
                    <span class="tech-badge">${task.tecnologia}</span>
                </div>
                <p class="task-desc">${task.descripcion || 'Sin descripción'}</p>
                <div class="task-footer">
                    <span class="status-badge ${task.estado === 'done' ? 'status-done' : 'status-pending'}">
                        ${task.estado === 'done' ? '● Completada' : '● Pendiente'}
                    </span>
                    <button class="delete-btn" data-id="${task._id}">Borrar</button>
                </div>
            `;
            taskList.appendChild(taskCard);
        });

        // Le ponemos el "oído" a los botones de borrar para saber cuándo se hace clic
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                await deleteTask(id);
            });
        });
    }

    // Cuando le das a guardar, pillamos los datos del formulario y los enviamos al servidor
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitamos que la página se recargue sola

        const newTask = {
            titulo: document.getElementById('titulo').value,
            descripcion: document.getElementById('descripcion').value,
            tecnologia: document.getElementById('tecnologia').value,
            estado: document.getElementById('estado').value
        };

        // Bloqueamos el botón para evitar que le den mil veces mientras se guarda
        saveBtn.disabled = true;
        saveBtn.innerText = 'Guardando...';

        try {
            // Enviamos el objeto al servidor convertido a texto JSON
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            });

            if (response.ok) {
                taskForm.reset(); // Limpiamos las cajitas del formulario para escribir otra
                await fetchTasks(); // Recargamos la lista para ver la nueva tarea arriba (porque usamos fecha: -1)
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (err) {
            console.error('Error creating task:', err);
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerText = 'Guardar Tarea';
        }
    });

    // Avisamos al servidor (petición DELETE) para que borre la tarea por su ID
    async function deleteTask(id) {
        if (!confirm('¿Estás seguro de que quieres borrar esta tarea?')) return;

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await fetchTasks(); // Si todo va bien, refrescamos la lista para que desaparezca
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    }

    // Carga inicial al entrar en la aplicación
    fetchTasks();
});

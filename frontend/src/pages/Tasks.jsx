import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import useForm from "../hooks/useForm";

const Tasks = () => {
    // Estados de la lista de tareas
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hook del formulario, nos da setValues para rellenarlo
    const { values, setValues, handleChange, handleReset } = useForm({
        title: "",
        description: "",
        is_completed: false, // Valor inicial del checkbox
    });

    // Estado para saber si estamos creando o editando
    const [idToEdit, setIdToEdit] = useState(null);

    const fetchTasks = async () => {
        // Solo mostramos el loading la primera vez
        if (tasks.length === 0) {
            setLoading(true);
        }

        try {
            const res = await fetch("http://localhost:3000/api/tasks-by-user", {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                // Aseguramos que tasks sea siempre un array
                setTasks(data.tasks || (Array.isArray(data) ? data : []));
            } else {
                console.error("Error al obtener las tareas");
                setTasks([]);
            }
        } catch (error) {
            console.error(error);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Funcion para manejar el envios
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Si "idToEdit" tiene un ID, llamamos a la funcion para actualizar
        // Si es "null", llamamos a la funcion para crear una tarea
        if (idToEdit) {
            handleUpdateTask();
        } else {
            handleCreateTask();
        }
    };

    // Funcion que se llama al presionar Editar en una tarea
    const handleSelectEdit = (task) => {
        // Ponemos el ID de la tarea seleccionada en el estado "idToEdit"
        setIdToEdit(task.id);
        // Usamos "setValues" del useForm para rellenar el formulario con los valores que continen
        setValues({
            title: task.title,
            description: task.description,
            is_completed: task.is_completed,
        });
    };

    // Funcion para Cancelar operacion
    const handleCancelEdit = () => {
        setIdToEdit(null); // Salimos del modo Editar
        handleReset(); // Vaciamos el formulario
    };

    // Funcion para Crear
    const handleCreateTask = async () => {
        if (!values.title) {
            alert("El título es obligatorio");
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                alert("¡Tarea creada exitosamente!");
                handleReset();
                fetchTasks();
            } else {
                const data = await res.json();
                alert(data.message || "Error al crear la tarea");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión al crear la tarea");
        }
    };

    // Funcion para Actualizar
    const handleUpdateTask = async () => {
        if (!values.title) {
            alert("El título es obligatorio");
            return;
        }
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${idToEdit}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });

            if (res.ok) {
                alert("¡Tarea actualizada exitosamente!");
                handleCancelEdit(); // Limpia el formulario y sale del modo Editar
                fetchTasks();
            } else {
                const data = await res.json();
                alert(data.message || "Error al actualizar la tarea");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión al actualizar la tarea");
        }
    };

    // Funcion para Borrar
    const handleDelete = async (taskId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (res.ok) {
                alert("Tarea eliminada exitosamente");
                fetchTasks();
            } else {
                const data = await res.json();
                alert(data.message || "Error al eliminar la tarea");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión al eliminar la tarea");
        }
    };

    return (
        <main style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)', color: '#222', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: 900, width: '100%', margin: '0 auto', display: 'flex', gap: 40 }}>
                <section style={{ flex: 1, backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.25)', borderRadius: 18, boxShadow: '0 8px 32px #c3cfe2', padding: 32, border: '1.5px solid rgba(255,255,255,0.18)' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 18, letterSpacing: 1, color: '#764ba2' }}>{idToEdit ? 'Editar' : 'Crear'} Tarea</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            placeholder="Título"
                            style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                            required
                        />
                        <textarea
                            id="description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            rows="2"
                            placeholder="Descripción"
                            style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        ></textarea>
                        <label style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                                type="checkbox"
                                id="is_completed"
                                name="is_completed"
                                checked={values.is_completed}
                                onChange={handleChange}
                                style={{ width: 18, height: 18 }}
                            />
                            Completada
                        </label>
                        <button type="submit" style={{ padding: '12px', borderRadius: 8, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', marginTop: 8, boxShadow: '0 2px 8px #c3cfe2', letterSpacing: 1 }}>
                            {idToEdit ? 'Actualizar Tarea' : 'Guardar Tarea'}
                        </button>
                        {idToEdit && (
                            <button type="button" onClick={handleCancelEdit} style={{ padding: '12px', borderRadius: 8, background: '#eee', color: '#222', fontWeight: 500, fontSize: 17, border: 'none', marginTop: 8 }}>
                                Cancelar Edición
                            </button>
                        )}
                    </form>
                </section>
                <section style={{ flex: 2, backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.25)', borderRadius: 18, boxShadow: '0 8px 32px #c3cfe2', padding: 32, border: '1.5px solid rgba(255,255,255,0.18)' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 18, letterSpacing: 1, color: '#764ba2' }}>Mis Tareas</h2>
                    <div style={{ minHeight: 120 }}>
                        {loading && <Loading />}
                        {!loading && (
                            <>
                                {tasks.length === 0 ? (
                                    <p style={{ textAlign: 'center', color: '#764ba2', paddingTop: 24, fontWeight: 500 }}>Aún no tienes tareas. ¡Añade una!</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        {tasks.map((task) => (
                                            <div key={task.id} style={{ background: 'rgba(255,255,255,0.45)', border: '1.5px solid #eee', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px #c3cfe2' }}>
                                                <div>
                                                    <div style={{ fontSize: 17, fontWeight: 600, textDecoration: task.is_completed ? 'line-through' : 'none', color: task.is_completed ? '#888888ff' : '#222' }}>{task.title}</div>
                                                    <div style={{ fontSize: 15, color: task.is_completed ? '#bbb' : '#666', textDecoration: task.is_completed ? 'line-through' : 'none' }}>{task.description}</div>
                                                </div>
                                                <div style={{ display: 'flex', gap: 10 }}>
                                                    <button onClick={() => handleSelectEdit(task)} style={{ fontSize: 15, padding: '8px 16px', borderRadius: 6, background: 'linear-gradient(90deg, #07a04eff 0%, #23a203b5 100%)', color: '#fff', border: 'none', fontWeight: 600, boxShadow: '0 2px 8px #c3cfe2', letterSpacing: 1 }}>Editar</button>
                                                    <button onClick={() => handleDelete(task.id)} style={{ fontSize: 15, padding: '8px 16px', borderRadius: 6, background: 'linear-gradient(90deg, #f44336 0%, #ff6a00 100%)', color: '#fff', border: 'none', fontWeight: 600, boxShadow: '0 2px 8px #c3cfe2', letterSpacing: 1 }}>Borrar</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Tasks;

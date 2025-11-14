import { useState, useEffect } from "react";
import { Link } from "react-router";
import Loading from "../components/Loading";

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Funcion para cargar ambos datos (perfil y tareas)
    const loadHomeData = async () => {
        try {
            const profilePromise = fetch("http://localhost:3000/api/profile", {
                credentials: "include",
            });
            const tasksPromise = fetch("http://localhost:3000/api/tasks-by-user", {
                credentials: "include",
            });

            // Ejecutamos ambas peticiones al mismo tiempo
            const [profileRes, tasksRes] = await Promise.all([
                profilePromise,
                tasksPromise,
            ]);

            // Procesamos los datos del perfil
            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setUserData(profileData.user);
            } else {
                console.error("Error al cargar el perfil");
            }

            // Procesamos los datos de las tareas
            if (tasksRes.ok) {
                const tasksData = await tasksRes.json();
                setTasks(
                    tasksData.tasks || (Array.isArray(tasksData) ? tasksData : []),
                );
            } else {
                console.error("Error al cargar las tareas");
            }
        } catch (error) {
            console.error("Error en las peticiones de Home:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHomeData();
    }, []);

    // Calculos de estadisticas
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.is_completed).length;
    const pendingTasks = totalTasks - completedTasks;

    if (loading) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)', color: '#222' }}>
                <Loading />
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)', color: '#222', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: 420, width: '100%', margin: '0 auto', textAlign: 'center', backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.25)', borderRadius: 18, boxShadow: '0 8px 32px #c3cfe2', padding: 36, border: '1.5px solid rgba(255,255,255,0.18)' }}>
                <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 18, letterSpacing: 1, color: '#764ba2' }}>
                    Bienvenido, <span style={{ color: '#222' }}>{userData?.name || 'Usuario'}</span>
                </h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{totalTasks}</div>
                        <div style={{ fontSize: 15, color: '#888' }}>Total</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{completedTasks}</div>
                        <div style={{ fontSize: 15, color: '#23a203b5' }}>Completadas</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{pendingTasks}</div>
                        <div style={{ fontSize: 15, color: '#fb0101a1' }}>Pendientes</div>
                    </div>
                </div>
                <Link to="/tasks" style={{ display: 'inline-block', padding: '12px 28px', borderRadius: 8, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 600, textDecoration: 'none', fontSize: 18, boxShadow: '0 2px 8px #c3cfe2', letterSpacing: 1 }}>
                    Ir a mis Tareas
                </Link>
            </div>
        </main>
    );
};

export default Home;

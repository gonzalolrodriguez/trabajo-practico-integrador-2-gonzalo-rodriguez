
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

const Profile = ({ onLogout }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/profile", {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setUserData(data.user);
            } else {
                console.error("Error al obtener perfil, cerrando sesión");
                onLogout();
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            onLogout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleLogoutClick = async () => {
        try {
            await fetch("http://localhost:3000/api/logout", {
                credentials: "include",
            });
        } catch (error) {
            console.error("Error al cerrar sesión en el backend:", error);
        } finally {
            onLogout();
        }
    };

    return (
        <main style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)', color: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <Loading />}
            {!loading && userData && (
                <div style={{
                    width: '100%',
                    maxWidth: 370,
                    padding: 32,
                    borderRadius: 18,
                    background: 'rgba(255,255,255,0.18)',
                    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(255,255,255,0.28)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                        <span style={{ fontSize: 36, color: '#222', fontWeight: 700 }}>{userData.name?.charAt(0) || '?'}</span>
                    </div>
                    <h1 style={{ fontSize: 26, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Mi Perfil</h1>
                    <div style={{ fontSize: 17, marginBottom: 8, color: '#555' }}>ID: {userData.id}</div>
                    <div style={{ fontSize: 17, marginBottom: 8, color: '#222' }}>Nombre: <span style={{ fontWeight: 500 }}>{userData.name}</span></div>
                    <div style={{ fontSize: 17, marginBottom: 8, color: '#222' }}>Apellido: <span style={{ fontWeight: 500 }}>{userData.lastname}</span></div>
                    {userData.email && <div style={{ fontSize: 17, marginBottom: 8, color: '#222' }}>Email: <span style={{ fontWeight: 500 }}>{userData.email}</span></div>}
                    <button onClick={handleLogoutClick} style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', marginTop: 24, boxShadow: '0 2px 8px #c3cfe2', letterSpacing: 1 }}>
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </main>
    );
};

export default Profile;

import { Link } from "react-router";

const Navbar = ({ authStatus, onLogout }) => {
    const handleLogoutClick = async () => {
        try {
            await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Error al cerrar sesión en el backend:", error);
        } finally {
            onLogout();
        }
    };

    return (
        <nav style={{ width: '100%', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', borderBottom: '1px solid #eee', padding: '14px 0', position: 'fixed', top: 0, left: 0, zIndex: 100, boxShadow: '0 2px 8px #c3cfe2' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
                <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>TLP II</h1>
                <div style={{ display: 'flex', gap: 22, fontSize: 16 }}>
                    {authStatus === "authenticated" ? (
                        <>
                            <Link to="/home" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, padding: '6px 12px', borderRadius: 6, transition: 'background 0.2s', background: 'rgba(255,255,255,0.08)' }}>Inicio</Link>
                            <Link to="/tasks" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, padding: '6px 12px', borderRadius: 6, transition: 'background 0.2s', background: 'rgba(255,255,255,0.08)' }}>Tareas</Link>
                            <Link to="/profile" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, padding: '6px 12px', borderRadius: 6, transition: 'background 0.2s', background: 'rgba(255,255,255,0.08)' }}>Perfil</Link>
                            <button onClick={handleLogoutClick} style={{ background: 'linear-gradient(90deg, #f44336 0%, #ff6a00 100%)', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600, boxShadow: '0 2px 8px #c3cfe2', cursor: 'pointer', transition: 'background 0.2s' }}>Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, padding: '6px 12px', borderRadius: 6, transition: 'background 0.2s', background: 'rgba(255,255,255,0.08)' }}>Iniciar sesión</Link>
                            <Link to="/register" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, padding: '6px 12px', borderRadius: 6, transition: 'background 0.2s', background: 'rgba(255,255,255,0.08)' }}>Registrarse</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
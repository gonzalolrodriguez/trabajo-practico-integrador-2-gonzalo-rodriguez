
import { useState } from "react";
import { Link } from "react-router";
import useForm from "../hooks/useForm";
import Loading from "../components/Loading";

const Login = ({ onLoginSuccess }) => {
    const { values, handleChange, handleReset } = useForm({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (res.ok) {
                onLoginSuccess();
            } else {
                alert(data.message || "Credenciales inválidas");
                handleReset();
            }
        } catch (err) {
            console.error(err);
            alert("Error al conectar con el servidor");
            handleReset();
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)', color: '#222' }}>
            {loading && <Loading />}
            <div style={{
                width: '100%',
                maxWidth: 400,
                padding: 36,
                borderRadius: 18,
                background: 'rgba(255,255,255,0.18)',
                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.28)',
                marginTop: 24
            }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 18, letterSpacing: 1, color: '#764ba2' }}>Iniciar sesión</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        placeholder="Usuario"
                        style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        required
                    />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        required
                    />
                    <button type="submit" style={{ padding: '12px', borderRadius: 8, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', marginTop: 8, boxShadow: '0 2px 8px #c3cfe2', letterSpacing: 1 }}>
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>
                <p style={{ textAlign: 'center', fontSize: 15, marginTop: 18, color: '#555' }}>
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" style={{ color: '#764ba2', textDecoration: 'underline', fontWeight: 500 }}>
                        Registrate
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;

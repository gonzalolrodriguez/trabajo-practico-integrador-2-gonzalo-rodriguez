import { useState } from "react";
import { Link } from "react-router";
import useForm from "../hooks/useForm";
import Loading from "../components/Loading";

const Register = ({ onLoginSuccess }) => {
    const { values, handleChange, handleReset } = useForm({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        dni: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Mapeando los datos como pide el backend
        const payload = {
            name: values.firstname,
            lastname: values.lastname,
            username: values.username,
            email: values.email,
            password: values.password,
        };

        try {
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                onLoginSuccess();
            } else {
                alert(data.message || "Error en el registro");
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
            <div style={{ width: '100%', maxWidth: 400, padding: 36, borderRadius: 18, background: '#fff', boxShadow: '0 8px 32px #c3cfe2', marginTop: 24 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 18, letterSpacing: 1, color: '#764ba2' }}>Crear cuenta</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Usuario"
                        value={values.username}
                        onChange={handleChange}
                        disabled={loading}
                        style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        required
                    />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        disabled={loading}
                        style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        required
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={values.password}
                        onChange={handleChange}
                        disabled={loading}
                        style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        required
                    />
                    <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        placeholder="Nombre"
                        value={values.firstname}
                        onChange={handleChange}
                        disabled={loading}
                        style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        required
                    />
                    <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        placeholder="Apellido"
                        value={values.lastname}
                        onChange={handleChange}
                        disabled={loading}
                        style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        required
                    />
                    <input
                        id="dni"
                        name="dni"
                        type="text"
                        placeholder="DNI"
                        value={values.dni}
                        onChange={handleChange}
                        disabled={loading}
                        style={{ padding: '12px', borderRadius: 8, border: '1.5px solid #764ba2', fontSize: 17, marginBottom: 2, background: '#f5f7fa' }}
                        required
                    />
                    <button type="submit" style={{ padding: '12px', borderRadius: 8, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', marginTop: 8, boxShadow: '0 2px 8px #c3cfe2', letterSpacing: 1 }}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
                <p style={{ textAlign: 'center', fontSize: 15, marginTop: 18, color: '#555' }}>
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" style={{ color: '#764ba2', textDecoration: 'underline', fontWeight: 500 }}>
                        Iniciar Sesión
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;

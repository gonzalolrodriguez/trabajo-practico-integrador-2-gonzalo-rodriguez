import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

// Componente principal de la aplicación
const App = () => {
  // Estado para controlar la autenticación del usuario
  const [authStatus, setAuthStatus] = useState("checking");

  // Verifica si el usuario está autenticado al cargar la app
  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        setAuthStatus("authenticated"); // Usuario autenticado
      } else {
        setAuthStatus("unauthenticated"); // Usuario no autenticado
      }
    } catch (error) {
      console.error(error);
      setAuthStatus("unauthenticated");
    }
  };

  // Ejecuta la verificación de autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, []);

  // Función para actualizar el estado al iniciar sesión
  const handleLogin = () => {
    setAuthStatus("authenticated");
  };

  // Función para actualizar el estado al cerrar sesión
  const handleLogout = () => {
    setAuthStatus("unauthenticated");
  };

  // Muestra pantalla de carga mientras se verifica la autenticación
  if (authStatus === "checking") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* Barra de navegación superior */}
      <Navbar authStatus={authStatus} onLogout={handleLogout} />

      {/* Enrutador principal de la app */}
      <AppRouter
        authStatus={authStatus}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Pie de página */}
      <Footer />
    </>
  );
};

export default App;

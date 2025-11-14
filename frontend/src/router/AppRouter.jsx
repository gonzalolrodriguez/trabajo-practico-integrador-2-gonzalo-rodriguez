import { Navigate, Route, Routes } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Tasks from "../pages/Tasks";

const AppRouter = ({ authStatus, onLogin, onLogout }) => {
    return (
        <Routes>
            <Route element={<PublicRoutes authStatus={authStatus} />}>
                <Route path="/login" element={<Login onLoginSuccess={onLogin} />} />
                <Route
                    path="/register"
                    element={<Register onLoginSuccess={onLogin} />}
                />
            </Route>

            <Route element={<PrivateRoutes authStatus={authStatus} />}>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile onLogout={onLogout} />} />
                <Route path="/tasks" element={<Tasks />} />
            </Route>

            <Route
                path="*"
                element={
                    <Navigate to={authStatus === "authenticated" ? "/home" : "/login"} />
                }
            />
        </Routes>
    );
};

export default AppRouter;

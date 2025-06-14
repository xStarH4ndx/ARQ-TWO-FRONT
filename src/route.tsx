import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {RouterLayout} from "./components/common/RouterLayout";
// import {LoginPage} from "./pages/auth/loginPage";

import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginPage";
import InventoryPage from "./pages/inventario/inventoryPage";
import GastosPage from "./pages/gastos/gastosPage";
//ADMINISTRADOR------------------------
// import AdminPage from "./pages/admin/adminPage";
// import AdminDashboard from "./pages/admin/adminDashboard";
// import AdminHistorial from "./pages/admin/adminHistorial";
//TEACHER------------------------
// import TeacherPage from "./pages/teacher/teacherPage";
// import UsuarioPerfil from "./components/common/userPerfil";
// import SolicitudesForm from "./pages/teacher/solicitudesForm";


export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      {/* Rutas sin el navbar */}
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<RouterLayout/>}>
        <Route path="/inventario" element={<InventoryPage/>} />
        <Route path="/gastos" element={<GastosPage/>} />
        <Route path="/recetas" element={<HomePage/>} />
      </Route>
    </Routes>
  );
};
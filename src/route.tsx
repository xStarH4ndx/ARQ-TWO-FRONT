import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouterLayout } from "./components/common/RouterLayout";

import HomePage from "./pages/homepage";
import InventoryPage from "./pages/inventario/inventoryPage";
import GastosPage from "./pages/gastos/gastosPage";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/recetas" />} />

      <Route path="/" element={<RouterLayout />}>
        <Route path="/inventario" element={<InventoryPage />} />
        <Route path="/gastos" element={<GastosPage />} />
        <Route path="/recetas" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

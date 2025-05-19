import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../layout";

export const RouterLayout: React.FC = () => {
  return (
    <>
      <Layout>
        <Outlet /> {/*esto me muestra la ruta (pagina) actual*/}
      </Layout>
    </>
  );
};
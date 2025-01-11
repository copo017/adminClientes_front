import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';  // Ajusta la ruta según tu estructura

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Outlet />  {/* Aquí se renderizarán las páginas según la ruta */}
      </main>
    </>
  );
};

export default Layout;

import React from 'react';
import Sidebar from './Sidebar'; {/* Importamos el componente Sidebar */}
import './Layout.css'; {/* Importamos los estilos para el layout */}

const Layout = ({ children, pages, onDeletePage }) => {
  return (
    <div className="layout">
      {/* Sidebar lateral que muestra los productos y permite eliminarlos */}
      <Sidebar pages={pages} onDeletePage={onDeletePage} />

      {/* Contenido principal (todo lo que no es sidebar) */}
      <main className="main-content">
        {children} {/* Aquí se renderizan las páginas dinámicas como Home, Create o View */}
      </main>
    </div>
  );
};

export default Layout;

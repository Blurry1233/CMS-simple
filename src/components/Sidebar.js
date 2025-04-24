import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeletePage from './DeletePage'; {/* Importamos el componente para eliminar páginas */}
import './Sidebar.css';

const Sidebar = ({ pages, onDeletePage }) => {
  const [isVisible, setIsVisible] = useState(false); {/* Controla si el sidebar está visible o no */}

  {/* Función para alternar la visibilidad del sidebar */}
  const toggleSidebar = () => setIsVisible(!isVisible);

  {/* Función para cerrar el sidebar */}
  const closeSidebar = () => setIsVisible(false);

  // Detectamos si el usuario presiona la tecla "ESC" para cerrar el sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeSidebar(); {/* Cierra el sidebar si se presiona Escape */}
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    {/* Limpieza del evento cuando se desmonta el componente */}
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Botón hamburguesa para abrir el sidebar */}
      {!isVisible && (
        <button className="toggle-sidebar-button" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      )}

      {/* Fondo oscuro que aparece cuando el sidebar está activo */}
      {isVisible && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar que se muestra u oculta según el estado */}
      <div className={`sidebar ${isVisible ? '' : 'hidden'}`}>
        <div className="content-list">
          <h2>Productos</h2>

          {/* Lista de productos/páginas */}
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                <Link to={`/page/${page.id}`}>{page.title}</Link> {/* Enlace a la página */}
                <DeletePage pageId={page.id} onDeletePage={onDeletePage} /> {/* Botón para eliminar */}
              </li>
            ))}
          </ul>
        </div>

        {/* Botón para agregar una nueva página/producto */}
        <div className="sidebar-footer">
          <Link to="/create" className="create-button">Agregar producto</Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
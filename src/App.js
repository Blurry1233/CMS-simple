{/* Importamos los hooks de React y componentes necesarios de React Router*/}
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
{/* Importamos los componentes y páginas que usaremos en las rutas*/}
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ViewPage from './pages/ViewPage';
{/* Cargamos las páginas iniciales desde un archivo JSON*/}
import initialPages from './data/pages.json';
{/* Importamos los estilos globales*/}
import './App.css';

function App() {
  {/* Estado que almacena la lista de páginas.
Intenta cargar las páginas desde localStorage, y si no hay, usa las iniciales.*/}
  const [pages, setPages] = useState(() => {
    const savedPages = localStorage.getItem('cms-pages');
    return savedPages ? JSON.parse(savedPages) : initialPages;
  });
  {/*useEffect para guardar en localStorage cada vez que se actualiza la lista de páginas*/}
  useEffect(() => {
    localStorage.setItem('cms-pages', JSON.stringify(pages));
  }, [pages]);

  {/* Función para agregar una nueva página */}
  const handleAddPage = (newPage) => {
    setPages([...pages, newPage]);
  };

  {/* Función para eliminar una página*/}
  const handleDeletePage = (id) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  {/*Estructura principal de la aplicación con Router*/}
  return (
    <Router>
      <div className="app">
        {/* Layout es el componente que envuelve todas las páginas, y recibe las páginas y la función de eliminar */}
        <Layout pages={pages} onDeletePage={handleDeletePage}>
          <Routes>
            {/* Ruta principal que muestra el listado de páginas */}
            <Route path="/" element={<HomePage pages={pages} />} />
            {/* Ruta para crear una nueva página */}
            <Route path="/create" element={<CreatePage onAddPage={handleAddPage} />} />
            {/* Ruta para ver una página específica usando el ID como parámetro */}
            <Route path="/page/:id" element={<ViewPage pages={pages} />} />
             {/* Ruta por defecto para redirigir a la página principal si no se encuentra la ruta */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
{/*Exportamos el componente App para que pueda usarse en el resto del proyecto*/}
export default App;
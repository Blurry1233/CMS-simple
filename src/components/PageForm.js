import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './PageForm.css';

const PageForm = ({ onAddPage }) => {
  {/* Estados para almacenar los valores del formulario */}
  const [title, setTitle] = useState('');            {/* Título de la página */}
  const [content, setContent] = useState('');         {/* Contenido principal */}
  const [price, setPrice] = useState('');             {/* Precio */}
  const [imageUrl, setImageUrl] = useState('');       {/* Imagen principal */}
  const [thumbnailUrls, setThumbnailUrls] = useState([]); {/* Imágenes pequeñas */}
  const [additionalThumbnail, setAdditionalThumbnail] = useState(''); {/* Imagen pequeña adicional */}

  const navigate = useNavigate(); {/* Hook para navegación */}

  {/* Maneja el envío del formulario */}
  const handleSubmit = (e) => {
    e.preventDefault();

    {/* Validación básica */}
    if (!title.trim() || !content.trim() || !imageUrl.trim() || thumbnailUrls.length === 0) {
      alert('Por favor, completa todos los campos');
      return;
    }

    {/* Crea un nuevo objeto de página */}
    const newPage = {
      id: uuidv4(),                         /* ID único */
      title: title.trim(),
      content: content.trim(),
      price: parseFloat(price.trim()),      /* Conversión a número */
      imageUrl: imageUrl.trim(),
      thumbnails: thumbnailUrls,            /* Array de miniaturas */
      additionalThumbnail: additionalThumbnail.trim(), /* Imagen adicional */
      createdAt: new Date().toISOString()   /* Fecha de creación */
    };

    onAddPage(newPage); {/* Llama a la función para agregar la página */}
    navigate(`/page/${newPage.id}`); {/* Redirecciona a la nueva página */}
  };

  {/* Maneja la carga de múltiples imágenes pequeñas */}
  const handleThumbnailChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setThumbnailUrls(urls); {/* Convierte las imágenes a URLs locales */}
  };

  {/* Maneja la carga de una imagen pequeña adicional */}
  const handleAdditionalThumbnailChange = (e) => {
    const file = e.target.files[0];
    setAdditionalThumbnail(URL.createObjectURL(file)); {/* Convierte y guarda la imagen */}
  };

  return (
    <div className="page-form-container">
      <h2>Crear Nueva Página</h2>
      <form onSubmit={handleSubmit} className="page-form">

        {/* Campo para el título */}
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingresa el título de la página"
            required
          />
        </div>

        {/* Campo para el contenido */}
        <div className="form-group">
          <label htmlFor="content">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ingresa el contenido de la página"
            rows="10"
            required
          />
        </div>

        {/* Campo para la imagen principal */}
        <div className="form-group">
          <label htmlFor="imageUrl">Imagen Principal:</label>
          <input
            type="file"
            id="imageUrl"
            onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))}
            required
          />
        </div>

        {/* Campo para múltiples miniaturas */}
        <div className="form-group">
          <label htmlFor="thumbnails">Imagen:</label>
          <input
            type="file"
            id="thumbnails"
            multiple
            onChange={handleThumbnailChange}
            accept="image/*"
            required
          />
        </div>

        {/* Campo para una imagen pequeña adicional */}
        <div className="form-group">
          <label htmlFor="additionalThumbnail">Imagen:</label>
          <input
            type="file"
            id="additionalThumbnail"
            onChange={handleAdditionalThumbnailChange}
            accept="image/*"
          />
        </div>

        {/* Campo para el precio */}
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ingresa el precio"
          />
        </div>

        {/* Botones de acción */}
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            Crear Página
          </button>
        </div>
      </form>
    </div>
  );
};
export default PageForm;
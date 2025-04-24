import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PageContent.css'; // Asegúrate de que este archivo esté en el mismo directorio

const PageContent = ({ pages }) => {
  const { id } = useParams(); {/* Obtenemos el ID de la URL */}
  const page = pages.find(p => p.id === id); {/* Buscamos la página correspondiente por ID */}

  {/* Estado para la imagen principal que se muestra */}
  const [mainImage, setMainImage] = useState('');
  
  {/* Estado para las miniaturas (thumbnails) */}
  const [thumbnails, setThumbnails] = useState([]);
  
  {/* Índice de la imagen actual mostrada */}
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    {/* Cuando la página cambia, actualizamos las imágenes */}
    if (page) {
      setMainImage(page.imageUrl); {/* Imagen principal */}
      setThumbnails(page.thumbnails || []); {/* Aseguramos que sea un array válido */}
      setCurrentImageIndex(0); {/* Reiniciamos el índice */}
    }
  }, [page]); {/* Solo se ejecuta cuando cambia `page` */}

  {/* Si no se encuentra la página, mostramos mensaje de error */}
  if (!page) {
    return (
      <div className="page-not-found">
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    );
  }

  {/* Reunimos todas las imágenes disponibles, evitando nulos */}
  const allImages = [page.imageUrl, ...thumbnails, page.additionalThumbnail].filter(Boolean);

  {/* Cambiar la imagen principal al hacer clic en una miniatura */}
  const changeMainImage = (imageUrl, index) => {
    setMainImage(imageUrl);
    setCurrentImageIndex(index);
  };

  {/* Ir a la siguiente imagen en el carrusel */}
  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setMainImage(allImages[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  {/* Ir a la imagen anterior en el carrusel */}
  const goToPreviousImage = () => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setMainImage(allImages[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  return (
    <main>
      <section className="page-content">

        {/* Sección izquierda: imagen principal + controles */}
        <section className="image-section">
          <div className="badge">
            <i className="fas fa-star text-black"></i>
            <span>Altamente valorado</span> {/* Texto decorativo */}
          </div>

          {/* Imagen principal */}
          <img
            alt={page.title}
            className="main-image"
            src={mainImage}
          />

          {/* Controles para navegar entre imágenes */}
          <div className="image-controls">
            <button aria-label="Previous image" className="control-button" onClick={goToPreviousImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button aria-label="Next image" className="control-button" onClick={goToNextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Sección derecha: detalles del producto */}
        <section className="details-section">
          <h1 className="product-title">{page.title}</h1> {/* Título */}
          <p className="product-price">${page.price}</p> {/* Precio */}
          <p className="product-description">{page.content}</p> {/* Descripción */}
          
          {/* Miniaturas */}
          <div className="thumbnails">
            {allImages.map((thumbnail, index) => (
              <button
                key={index}
                className="thumbnail-button"
                onClick={() => changeMainImage(thumbnail, index)}
              >
                <img
                  alt={`Thumbnail ${index}`}
                  className="thumbnail"
                  src={thumbnail}
                />
              </button>
            ))}
          </div>
        </section>
      </section>

      {/* Enlace para volver al inicio */}
      <Link to="/" className="back-link">Volver al inicio</Link>

      {/* Pie de página */}
      <footer className="footer">
        <p>Desarrollado por Magdiel Dominguez Arias</p>
      </footer>
    </main>
  );
};

export default PageContent;

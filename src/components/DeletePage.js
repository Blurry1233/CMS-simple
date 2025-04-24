// src/components/DeletePage.js
import React from 'react';

const DeletePage = ({ pageId, onDeletePage }) => {
  {/* Esta función se ejecuta cuando se hace clic en el botón */}
  const handleDelete = () => {
    onDeletePage(pageId); {/* Llama a la función que elimina la página, pasando el ID */}
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Eliminar {/* Texto del botón */}
    </button>
  );
};

export default DeletePage;

import React, { useState, useEffect } from 'react';

export const GifItem = ({ id, title, url, onDelete, showFavoriteButton = true }) => {
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    setIsFavorite(favoritos.some(fav => fav.id === id));
  }, [id]);

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (isFavorite) {
      const nuevosFavoritos = favoritos.filter(fav => fav.id !== id);
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      setIsFavorite(false);
      if (onDelete) onDelete(); // Llamar a onDelete si se proporciona
    } else {
      const nuevosFavoritos = [...favoritos, { id, title, url }];
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      setIsFavorite(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="card">
      <img src={url} alt={title} />
      <p>{title}</p>
      {showFavoriteButton && (
        <button 
          onClick={toggleFavorito} 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
        </button>
      )}
      <button onClick={handleCopyLink} className="copy-button">
        {copied ? "¡Enlace copiado!" : "Copiar enlace"}
      </button>
    </div>
  );
};
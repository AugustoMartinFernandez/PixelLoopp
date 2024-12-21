import React, { useState, useEffect } from 'react';
import { GifItem } from './GifItem';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  const eliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter(fav => fav.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  return (
    <div className="favorites-container">
      <h3>Mis GIFs Favoritos</h3>
      {favoritos.length === 0 ? (
        <p>No tienes GIFs favoritos guardados.</p>
      ) : (
        <div className="card-grid">
          {favoritos.map((gif) => (
            <GifItem 
              key={gif.id} 
              {...gif} 
              onDelete={() => eliminarFavorito(gif.id)}
              showDeleteButton={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
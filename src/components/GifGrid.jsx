import React, { useState, useEffect } from 'react';
import { GifItem } from './GifItem';
import { getGifs } from '../helpers/getGifs';

export const GifGrid = ({ categories, removeCategory }) => {
  return (
    <>
      {categories.map((category) => (
        <div key={category}>
          <div className="category-item">
            <h3>{category}</h3>
            <button 
              className="delete-category-button"
              onClick={() => removeCategory(category)}
            >
            </button>
          </div>
          <GifList category={category} />
        </div>
      ))}
    </>
  );
};

// Manejador de la lista de GIFs para cada categoría
const GifList = ({ category }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const newImages = await getGifs(category);
        setImages(newImages);
      } catch (err) {
        setError("Hubo un error al cargar los GIFs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [category]);

  if (isLoading) return <div className="loading"><div className="spinner"></div><p>Cargando...</p></div>;
  if (error) return <p>{error}</p>;
  if (images.length === 0) return <p>No se encontraron resultados para "{category}"</p>;

  return (
    <div className="card-grid">
      {images.map((image) => (
        <GifItem key={image.id} {...image} />
      ))}
    </div>
  );
};
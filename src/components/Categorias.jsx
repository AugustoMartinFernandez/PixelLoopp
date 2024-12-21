import React, { useState, useEffect } from 'react';
import { getGifs } from '../helpers/getGifs';
import { GifItem } from './GifItem';

const Categorias = () => {
  const categoriasPopulares = [
    'Anime', 'Gaming', 'Memes', 'Reactions', 'Deportes',
    'Películas', 'Animales', 'Música',
    'Tecnología', 'Humor'
  ];

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selected-category') || categoriasPopulares[0];
  });
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryClick = async (categoria) => {
    setSelectedCategory(categoria);
    localStorage.setItem('selected-category', categoria);
    setIsLoading(true);
    setError(null);
    try {
      const fetchedGifs = await getGifs(categoria);
      setGifs(fetchedGifs);
    } catch (err) {
      setError('Hubo un error al cargar los GIFs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCategoryClick(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="categories-page">
      <h3>Categorías Populares</h3>
      <div className="category-grid">
        {categoriasPopulares.map((categoria) => (
          <div 
            key={categoria} 
            className={`category-filter ${selectedCategory === categoria ? 'active' : ''}`}
            onClick={() => handleCategoryClick(categoria)}
          >
            <span>{categoria}</span>
          </div>
        ))}
      </div>

      {isLoading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <div className="card-grid">
        {gifs.map((gif) => (
          <GifItem 
            key={gif.id} 
            title={gif.title} 
            url={gif.url} 
            showFavoriteButton={false} // No mostrar el botón de favoritos
          />
        ))}
      </div>
    </div>
  );
};

export default Categorias;
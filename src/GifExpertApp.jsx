import React, { useState, useEffect } from "react";
import { AddCategory } from "./components/AddCategory";
import { GifGrid } from "./components/GifGrid";

export const GifExpertApp = () => {
  const [categories, setCategories] = useState([]);

  // Recupera las categorías del localStorage cuando se carga la página
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      setCategories(storedCategories);
    }
  }, []);

  // Función para agregar una nueva categoría
  const onAddCategory = (newCategory) => {
    if (categories.includes(newCategory)) return;
    const updatedCategories = [newCategory, ...categories];
    setCategories(updatedCategories);

    // Guarda las categorías actualizadas en el localStorage
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  // Función para limpiar todas las categorías
  const clearCategories = () => {
    setCategories([]);
    localStorage.removeItem("categories"); // Elimina las categorías del localStorage
  };

  // Función para eliminar una categoría específica
  const onDeleteCategory = (categoryToDelete) => {
    const updatedCategories = categories.filter((category) => category !== categoryToDelete);
    setCategories(updatedCategories);

    // Guarda las categorías actualizadas en el localStorage
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="app-title">PixelLoop</h1>
        <p className="app-subtitle">Encuentra Tu GIF Perfecto</p>
        <AddCategory onNewCategory={(value) => onAddCategory(value)} />
        <button className="clear-button" onClick={clearCategories}>
          Limpiar búsquedas
        </button>
      </header>

      {/* Contenedor de filtros de categorías */}
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category} className="category-filter">
            <span>{category}</span>
            <button 
              onClick={() => onDeleteCategory(category)} 
              className="delete-category-button"
              aria-label={`Eliminar categoría ${category}`}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <main>
        {categories.length === 0 ? (
          <div>
            <h2 className="empty-message">¡Explora y encuentra el GIF perfecto!</h2>
          </div>
        ) : (
          categories.map((category) => (
            <GifGrid key={category} category={category} />
          ))
        )}
      </main>

      <footer>
        <div className="social-links">
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
        <p className="footer-text">
          &copy; 2024 TinchoDev | Powered by Giphy API
        </p>
      </footer>
    </div>
  );
};


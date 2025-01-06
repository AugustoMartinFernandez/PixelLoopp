import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CustomNavBar from "./components/CustomNavBar";
import { GifGrid } from "./components/GifGrid";
import Favoritos from "./components/Favoritos";
import Categorias from "./components/Categorias";
import { Contacto } from "./components/Contacto";
import { AddCategory } from "./components/AddCategory";
import AnuncioModal from './components/AnuncioModal';


const ShowCategories = ({ categories, removeCategory }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div key={category} className="category-filter">
          <span>{category}</span>
          <button
            onClick={() => removeCategory(category)}
            className="delete-category-button"
            aria-label={`Eliminar categoría ${category}`}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export const GifExpertApp = () => {
  const [categories, setCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("gif-categories")) || [];
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selected-category") || "";
  });

  useEffect(() => {
    localStorage.setItem("gif-categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("selected-category", selectedCategory);
  }, [selectedCategory]);

  const handleSearch = (query) => {
    if (!categories.includes(query)) {
      setCategories((prev) => [query, ...prev]);
    }
  };

  const removeCategory = (category) => {
    setCategories((prev) => prev.filter((c) => c !== category));
  };

  const location = useLocation();

  return (
    <div className="app-container">
      <AnuncioModal />
      <CustomNavBar onSearch={handleSearch} />
      <main>
        {location.pathname === "/" && (
          <header>
            <h2 className="app-title">¡Encuentra Tu GIF Perfecto!</h2>
            <ShowCategories categories={categories} removeCategory={removeCategory} />
            <AddCategory onNewCategory={handleSearch} />
          </header>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <GifGrid
                categories={categories}
                removeCategory={removeCategory}
              />
            }
          />
          <Route 
            path="/categorias" 
            element={
              <Categorias 
                onCategorySelect={handleSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            } 
          />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <footer>
        <div className="social-links">
          <a href="https://www.threads.net/@tinchoo_dev?invite=1" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://www.instagram.com/tinchoo_dev/profilecard/?igsh=ZXV4eGl3amgyYWE0" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/tinchodev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <p className="footer-text">
          &copy; 2024 TinchoDev | Powered by Giphy API
        </p>
      </footer>
    </div>
  );
};
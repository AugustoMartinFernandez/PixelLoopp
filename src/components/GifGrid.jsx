import { useState, useEffect } from "react";
import { GifItem } from "./GifItem";
import { getGifs } from "../helpers/getGifs";

export const GifGrid = ({ category }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null); // Reinicia el error antes de la nueva petición

      try {
        const newImages = await getGifs(category);
        // Simula un retraso de  segundos
        setTimeout(() => {
          setImages(newImages);
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        setError("Hubo un error al cargar los GIFs");
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (images.length === 0) {
    return <p>No se encontraron resultados para "{category}"</p>;
  }

  return (
    <>
      <h3>{category}</h3>
      <div className="card-grid">
        {images.map((image) => (
          <GifItem key={image.id} {...image} />
        ))}
      </div>
    </>
  );
};



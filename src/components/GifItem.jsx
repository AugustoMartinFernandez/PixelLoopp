import React, { useState } from "react";

export const GifItem = ({ title, url }) => {
  if (!url) return null; // Evita renderizar si no hay URL válida

  const [copied, setCopied] = useState(false); // Estado para manejar el mensaje de copia

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url) // Copia la URL al portapapeles
      .then(() => setCopied(true)) // Si la copia es exitosa, actualiza el estado
      .catch((err) => console.error("Error al copiar el enlace: ", err)); // Maneja cualquier error
  };

  return (
    <div className="card">
      <img src={url} alt={title || "Imagen"} />
      <p>{title || "Sin título"}</p>
      <button onClick={handleCopyLink} className="copy-button">
        {copied ? "¡Enlace copiado!" : "Copiar enlace"}
      </button>
    </div>
  );
};

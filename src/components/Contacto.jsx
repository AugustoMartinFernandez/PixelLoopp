import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../helpers/firebase';
import { toast } from 'react-toastify';

export const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "contactos"), formData);
      toast.success("Mensaje enviado correctamente", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (e) {
      console.error("Error al añadir el documento: ", e);
      toast.error("Hubo un error al enviar el mensaje. Inténtalo de nuevo.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </form>

      {/* Sección FAQ fuera del formulario */}
      <div className="faq-section">
        <h3>FAQ sobre GIFs</h3>
        <div className="faq-item">
          <h4>¿Cómo buscar GIFs?</h4>
          <p>Utiliza la barra de búsqueda en la página principal. Navega por las categorías predefinidas en la sección "Categorías". Usa palabras clave relacionadas con el contenido deseado.</p>
        </div>
        <div className="faq-item">
          <h4>¿Cómo guardar GIFs?</h4>
          <p>Haz clic en el botón "❤️ Agregar a favoritos" en cualquier GIF. Los GIFs guardados aparecerán en la sección "Favoritos". Puedes acceder a tus favoritos en cualquier momento desde el menú.</p>
        </div>
        <div className="faq-item">
          <h4>¿Cómo compartir GIFs?</h4>
          <p>Usa el botón "Copiar enlace" debajo de cada GIF. El enlace se copiará automáticamente al portapapeles. Comparte el enlace en cualquier plataforma o red social.</p>
        </div>
      </div>
    </div>
  );
};
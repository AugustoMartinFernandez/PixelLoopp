import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { Twitter, Github, Linkedin } from "lucide-react"; 
import { db } from "../helpers/firebase";
import { toast } from "react-toastify";

const AnuncioModal = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactos"), formData);
      toast.success("¡Gracias por tu mensaje!", {
        theme: "dark",
      });
      setShow(false);
      setFormData({ nombre: "", email: "", mensaje: "" }); 
    } catch (error) {
      toast.error("Error al enviar el mensaje");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} style={{display: "flex", justifyContent:"center"}}>
      <Modal.Header closeButton>
        <Modal.Title>¡Bienvenido a PixelLoop!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Fui creado por Martín Fernández, un Desarrollador Web Frontend React
        </p>
        <p>Siguelo en sus redes sociales</p>
        <Modal.Title>Agradecele a continuacion</Modal.Title>
        <ul>
          <li>
            <a
              href="https://twitter.com/tu_usuario"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} className="icon" /> Twitter
            </a>
          </li>
          <li>
            <a
              href="https://github.com/tu_usuario"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} className="icon" /> GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/tu_usuario"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} className="icon" /> LinkedIn
            </a>
          </li>
        </ul>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={(e) =>
                setFormData({ ...formData, mensaje: e.target.value })
              }
              required
              className="custom-textarea"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            Enviar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AnuncioModal;

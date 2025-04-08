import React from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from './recursos/portada'; 

const Home = () => {
  return (
    <div>
      <h2>Bienvenido</h2>
      <p>Seleccione una opción:</p>

      {/* Carrusel de imágenes */}
      <ImageCarousel />

      <Link to="/login">
        <button>
          Ir a Login
        </button>
      </Link>

      <Link to="/c_usuario">
        <button>
          Ir al Formulario
        </button>
      </Link>
    </div>
  );
};

export default Home;

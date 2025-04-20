import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from "react";

const N_global = () => {
    const carouselWrapperStyle = {
        marginTop: "30px", 
        maxWidth: "80%",  
        margin: "0 auto", 
    };

    const imageContainerStyle = {
        position: "relative", 
        overflow: "hidden",  
        height: "400px",       
        borderRadius: "15px",  
    };

    const imageStyle = {
        width: "100%",      
        height: "100%",        
        objectFit: "cover",  
        transition: "transform 0.5s ease", 
        display: "block",    
        margin: "0 auto",   
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-progress");
                } else {
                    entry.target.classList.remove("animate-progress");
                }
            });
        });

        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) {
            observer.observe(progressBar);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div>
            {/* Navbar */}
            <nav className="" style={{ backgroundColor: "#198754" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3 text-white" to="/">
                        <img src="/img/logo.png" alt="Logo" style={{ height: "40px" }} />
                    </Link>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/login">Inicia Sesión</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/create_usuario">Regístrate</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Carrusel */}
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                style={carouselWrapperStyle}
                data-bs-ride="carousel"
                data-bs-interval="3000"
            >
                <div className="carousel-indicators">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                        ></button>
                    ))}
                </div>

                <div className="carousel-inner">
                    {["Img1.jpg", "Img3.jpg", "Img4.jpg", "Img5.jpg", "Img6.jpg"].map((img, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <div style={imageContainerStyle}>
                                <img
                                    src={img}
                                    alt={`Imagen ${index + 1}`}
                                    style={imageStyle}
                                    className="zoom-effect"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

           
            {/* Sobre Nosotros */}
            <section
      className="py-5"
      style={{ backgroundColor: "#198754", marginTop: "4rem" }}
    >
      <div className="container text-center text-white">
        <h2 className="mb-4">Sobre Navtracker</h2>

        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* Primer Slide - Sobre Navtracker */}
            <div className="carousel-item active">
              <p className="lead">
                En <strong>Navtracker</strong>, nos dedicamos a ofrecer
                soluciones de rastreo en tiempo real para los pasajeros de
                camiones interurbanos. Nuestra misión es brindar seguridad,
                puntualidad y confianza a todos nuestros usuarios.
              </p>
            </div>
            <div className="carousel-item">
              <p className="lead">
                Con el uso de tecnología avanzada, garantizamos que nuestros
                usuarios tengan acceso a información actualizada sobre la
                ubicación de sus vehículos, lo que les permite tomar decisiones
                informadas y reducir tiempos de espera.
              </p>
            </div>
            <div className="carousel-item">
              <p className="lead">
                Nos comprometemos a ofrecer una experiencia de viaje más
                cómoda y segura, conectando a los pasajeros con sus destinos de
                manera eficiente. Además, trabajamos en colaboración con las
                principales empresas de transporte para mejorar constantemente
                nuestros servicios.
              </p>
            </div>

            {/* Segundo Slide - ¿Por qué elegir Navtracker? */}
            <div className="carousel-item">
              <ul className="list-unstyled">
                <li>
                  <i className="bi bi-check-circle-fill"></i> <strong>Seguridad:</strong> Protección en todo momento con monitoreo en tiempo real.
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> <strong>Puntualidad:</strong> Información precisa para reducir tiempos de espera y garantizar la llegada a tiempo.
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> <strong>Confianza:</strong> Nuestro sistema es transparente y fácil de usar, asegurando que siempre tengas el control.
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> <strong>Innovación:</strong> Tecnología de vanguardia para ofrecer el mejor servicio de rastreo.
                </li>
              </ul>
            </div>
          </div>

          {/* Controles del Carrusel */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>


            {/* Contáctanos */}
             {/* Contáctanos */}
             <section className="py-5 bg-white">
                <div className="container text-center contacto-box">
                    <h2 className="mb-4">Contáctanos</h2>
                    <p className="lead mb-3">¿Tienes dudas o comentarios? ¡Nos encantaría saber de ti!</p>
                    <p>Email: <a href="mailto:info@navtracker.com">al222310400@gmail.com</a></p>
                    <p>Teléfono: +1 (800) 123-4567</p>
                    <p>Dirección: Calle Futura 123, Ciudad Innovación</p>

                    {/* Formulario de contacto */}
                    <form action="mailto:info@navtracker.com" method="post" encType="text/plain">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="name" name="name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" name="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Mensaje</label>
                            <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Enviar mensaje</button>
                    </form>
                </div>
            </section>

            <style jsx>{`
                .zoom-effect:hover {
                    transform: scale(1.1);
                }

                .progress-bar {
                    width: 0%;
                    transition: width 2s ease;
                }

                .animate-progress {
                    width: 100%;
                }

                .contacto-box {
                    background-color: #e0f7e0; /* Color verde suave */
                    border: 2px solid #4CAF50; /* Borde verde más oscuro */
                    border-radius: 15px; /* Bordes redondeados */
                    padding: 20px; /* Espaciado interno */
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
                    margin: 0 auto; /* Centrado */
                    max-width: 600px; /* Máximo ancho para que no se estire demasiado */
                }
            `}</style>

            <style jsx>{`
                .zoom-effect:hover {
                    transform: scale(1.1);
                }

                .progress-bar {
                    width: 0%;
                    transition: width 2s ease;
                }

                .animate-progress {
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default N_global;

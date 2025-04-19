import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/n_global_m.css";
import { useEffect } from "react";

const N_global_m = () => {
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
    if (progressBar) observer.observe(progressBar);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Carrusel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide mt-5"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          {[0, 1, 2, 3, 4].map((index) => (
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
              <div className="image-container">
                <img src={img} className="d-block w-100 zoom-effect" alt={`Imagen ${index + 1}`} />
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
      <section className="py-4" style={{ backgroundColor: "#198754", color: "#fff", marginTop: "2rem" }}>
        <div className="container text-center">
          <h2 className="mb-3">Sobre Navtracker</h2>
          <div id="sobreCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <p>
                  En <strong>Navtracker</strong>, nos dedicamos a ofrecer soluciones de rastreo en tiempo real para los pasajeros de camiones interurbanos.
                </p>
              </div>
              <div className="carousel-item">
                <p>
                  Garantizamos acceso a información actualizada para tomar decisiones informadas y reducir tiempos de espera.
                </p>
              </div>
              <div className="carousel-item">
                <p>
                  Buscamos comodidad, seguridad y eficiencia para todos los pasajeros. Trabajamos junto a las principales empresas de transporte.
                </p>
              </div>
              <div className="carousel-item">
                <ul className="list-unstyled text-start">
                  <li>✔ <strong>Seguridad:</strong> Monitoreo en tiempo real.</li>
                  <li>✔ <strong>Puntualidad:</strong> Llegadas a tiempo.</li>
                  <li>✔ <strong>Confianza:</strong> Sistema transparente.</li>
                  <li>✔ <strong>Innovación:</strong> Tecnología de vanguardia.</li>
                </ul>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#sobreCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#sobreCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Contáctanos */}
      <section className="py-4 bg-light">
        <div className="container text-center contacto-box">
          <h2 className="mb-3">Contáctanos</h2>
          <p className="lead">¿Tienes dudas o comentarios? ¡Nos encantaría saber de ti!</p>
          <p>Email: <a href="mailto:al222310400@gmail.com">al222310400@gmail.com</a></p>
          <p>Teléfono: +1 (800) 123-4567</p>
          <p>Dirección: Calle Futura 123, Ciudad Innovación</p>

          <form action="mailto:al222310400@gmail.com" method="post" encType="text/plain">
            <div className="mb-2">
              <input type="text" className="form-control" name="name" placeholder="Nombre" required />
            </div>
            <div className="mb-2">
              <input type="email" className="form-control" name="email" placeholder="Correo electrónico" required />
            </div>
            <div className="mb-2">
              <textarea className="form-control" name="message" placeholder="Mensaje" rows="3" required></textarea>
            </div>
            <button type="submit" className="btn btn-success btn-sm">Enviar mensaje</button>
          </form>
        </div>
      </section>

      {/* Navbar móvil */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-bottom bg-white border-top">
        <div className="container-fluid d-flex justify-content-around">
          <Link to="/" className="navbar-brand d-flex flex-column align-items-center">
            <img src="/img/home.png" alt="Inicio" className="navbar-img" style={{height:"40px", width:"40px", marginLeft:"1px"}} />
            <p className="texto" style={{fontSize:"16px"}}>Inicio</p>
          </Link>
          <Link to="/rastreos" className="navbar-brand d-flex flex-column align-items-center">
            <img src="/img/logo_2.png" alt="Rastreos" className="navbar-img" style={{height:"40px", width:"50px"}}/>
            <p className="texto" style={{fontSize:"16px"}}>Rastreos</p>
          </Link>
          <Link to="/ubicacion" className="navbar-brand d-flex flex-column align-items-center">
            <img src="/img/rastreo.png" alt="Ubicación" className="navbar-img" style={{height:"40px", width:"40px"}}/>
            <p className="texto" style={{fontSize:"16px"}}>Ubicación</p>
          </Link>
          <Link to="/sesion" className="navbar-brand d-flex flex-column align-items-center">
            <img src="/img/perfil.png" alt="Perfil" className="navbar-img" style={{height:"40px", width:"40px", marginLeft:"1px"}}/>
            <p className="texto" style={{fontSize:"16px"}}>Perfil</p>
          </Link>
        </div>
      </nav>

      <style jsx>{`
        .image-container {
          height: 250px;
          overflow: hidden;
          border-radius: 10px;
        }
        .zoom-effect:hover {
          transform: scale(1.1);
          transition: transform 0.5s ease;
        }
        .contacto-box {
          background-color: #e0f7e0;
          border: 2px solid #4CAF50;
          border-radius: 10px;
          padding: 15px;
          margin: 0 auto;
          max-width: 90%;
        }
        .navbar-img {
          width: 30px;
          height: 30px;
        }
        .texto {
          font-size: 0.8rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default N_global_m;

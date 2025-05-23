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
      {/* Bienvenido */}
      <div style={{ backgroundColor: "#198754", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
      <br></br>
      <h2 style={{marginTop:"0px",marginLeft:"10px",fontSize:"20px",marginBottom:"0px",color:"white"}}>Bienvenido a</h2>
      <h2 style={{marginTop:"10px",marginLeft:"10px",fontSize:"20px",marginBottom:"0px",color:"white"}}>NavTracker</h2>
      <br></br>
      </div>
      {/* Carrusel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        style={{ marginTop: "5px" }}
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          {[0, 1, 2, 3, ].map((index) => (
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
          {["Img3.jpg", "Img4.jpg", "Img5.jpg", "Img6.jpg"].map((img, index) => (
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
<section
  className="py-4"
  style={{ backgroundColor: "white", marginTop: "0px" }}
>
  <div
    className=" text-center"
    style={{
      border: "1px solid grey",
      borderRadius: "10px",
      padding: "20px",
      margin: "5px",
      marginRight: "5px"
    }}
  >
    <h2 className="mb-3">Sobre nosotros</h2>
    <div id="sobreCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <p className="text-muted">
            En <strong>Navtracker</strong>, nos dedicamos a ofrecer soluciones de rastreo en tiempo real para los pasajeros de camiones interurbanos.
          </p>
        </div>
        <div className="carousel-item">
          <p className="text-muted">
            Garantizamos acceso a información actualizada para tomar decisiones informadas y reducir tiempos de espera.
          </p>
        </div>
        <div className="carousel-item">
          <p className="text-muted">
            Buscamos comodidad, seguridad y eficiencia para todos los pasajeros. Trabajamos junto a las principales empresas de transporte.
          </p>
        </div>
        <div className="carousel-item">
          <ul className="list-unstyled text-start text-muted">
            <li>✔ <strong>Seguridad:</strong> Monitoreo en tiempo real.</li>
            <li>✔ <strong>Puntualidad:</strong> Llegadas a tiempo.</li>
            <li>✔ <strong>Confianza:</strong> Sistema transparente.</li>
          </ul>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#sobreCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#sobreCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>

  <style jsx>{`
    @media (max-width: 576px) {
      .carousel-inner p,
      .carousel-inner ul {
        font-size: 0.9rem;
        padding: 0 10px;
      }
    }
  `}</style>
</section>



      {/* Contáctanos */}
<section className="py-4" style={{ backgroundColor: "gray", color: "white" }}>
  <div className="container text-center" style={{marginTop:"0px", marginBottom:"120px"}}>
    <h2 className="mb-3" style={{color:"white"}}>Contáctanos</h2>
    <p className="lead">¿Tienes dudas o comentarios? ¡Nos encantaría saber de ti!</p>
    <p>Email: <a href="mailto:al222310400@gmail.com" style={{ color: "#66ccff" }}>al222310400@gmail.com</a></p>
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

  <style jsx>{`
    .contacto-box-dark {
      background-color: #2c2c2c;
      border: 2px solid #555;
      border-radius: 10px;
      padding: 20px;
      margin: 0 auto;
      max-width: 90%;
    }
    input.form-control,
    textarea.form-control {
      background-color:;
      color: white;
      border: 1px solid #555;
    }
    input.form-control::placeholder,
    textarea.form-control::placeholder {
      color: #aaa;
    }
    input.form-control:focus,
    textarea.form-control:focus {
      border-color: #66ccff;
      outline: none;
      box-shadow: none;
    }
  `}</style>
</section>


      {/* Navbar móvil */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-bottom bg-white border-top">
        <div className="container-fluid d-flex justify-content-around">
          <Link to="/" className="navbar-brand d-flex flex-column align-items-center nav-hover">
            <img src="/img/home.png" alt="Inicio" className="navbar-img" style={{height:"40px", width:"40px", marginLeft:"1px"}} />
            <p className="texto" style={{fontSize:"16px"}}>Inicio</p>
          </Link>
          <Link to="/rastreos" className="navbar-brand d-flex flex-column align-items-center nav-hover">
            <img src="/img/logo_2.png" alt="Rastreos" className="navbar-img" style={{height:"40px", width:"50px"}}/>
            <p className="texto" style={{fontSize:"16px"}}>Rastreos</p>
          </Link>
          <Link to="/ubicacion" className="navbar-brand d-flex flex-column align-items-center nav-hover">
            <img src="/img/rastreo.png" alt="Ubicación" className="navbar-img" style={{height:"40px", width:"40px"}}/>
            <p className="texto" style={{fontSize:"16px"}}>Ubicación</p>
          </Link>
          <Link to="/sesion" className="navbar-brand d-flex flex-column align-items-center nav-hover">
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
        
        .nav-hover {
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        border-radius: 10px;
        padding: 5px;
        }
        .nav-hover:hover {
        background-color: #f0f0f0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default N_global_m;

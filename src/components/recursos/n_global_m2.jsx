import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/n_global_m.css";

const N_global_m = () => {
return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light fixed-bottom">
        <div className="container-fluid d-flex justify-content-center">
        <Link to="/" className="navbar-brand d-flex flex-column align-items-center me-0">
            <img src="/img/home.png" alt="Logo" className="navbar-logo" />
            <p className="texto">Inicio</p>
        </Link>
        <Link to="/rastreos" className="navbar-brand d-flex flex-column align-items-center me-0">
            <img src="/img/logo_2.png" alt="Logo" className="navbar-img" />
            <p className="texto">Rastreos</p>
        </Link>
        <Link to="/ubicacion" className="navbar-brand d-flex flex-column align-items-center me-0">
            <img src="/img/rastreo.png" alt="Logo" className="navbar-img" />
            <p className="texto">Ubicación</p>
        </Link>
        <Link to="/sesion" className="navbar-brand d-flex flex-column align-items-center me-0">
            <img src="/img/perfil.png" alt="Logo" className="navbar-img" />
            <p className="texto">Perfil</p>
        </Link>
        </div>
    </nav>
    </div>
);
};

export default N_global_m;

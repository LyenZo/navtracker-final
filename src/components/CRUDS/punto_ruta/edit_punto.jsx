import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit_punto = () => {
    const { id_punto } = useParams();
    const navigate = useNavigate();
    const [punto, setPunto] = useState({
        nombre: "",
        latitud: "",
        longitud: "",
        direccion: ""
    });

    useEffect(() => {
        axios.get(`https://api.navtracker.xdn.com.mx/api/punto_ruta/${id_punto}`)
            .then(response => setPunto(response.data))
            .catch(error => console.error(error));
    }, [id_punto]);

    const handleChange = (e) => {
        setPunto({ ...punto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://api.navtracker.xdn.com.mx/api/punto_ruta/${id_punto}`, punto)
            .then(() => {
                alert("Punto de ruta actualizado");
                navigate("/crud_punto");
            })
            .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_punto");
    };

    return (
        <div className="">
            <div className="card shadow p-4" style={{ backgroundColor: "#d4edda" }}>
                <h1 className="text-center text-success">Editar Punto</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" name="nombre" value={punto.nombre} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Latitud</label>
                        <input type="text" className="form-control" name="latitud" value={punto.latitud} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Longitud</label>
                        <input type="text" className="form-control" name="longitud" value={punto.longitud} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" name="direccion" value={punto.direccion} onChange={handleChange} required />
                    </div>
                    <div className=" justify-content-between">
                        <button type="submit" className="btn btn-success">Actualizar Punto</button>
                        <button type="button" className="btn btn-secondary" onClick={handleRedirect}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit_punto;
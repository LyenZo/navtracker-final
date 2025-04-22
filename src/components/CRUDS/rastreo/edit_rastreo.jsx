import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit_rastreo = () => {
    const { id_rastreo } = useParams();
    const navigate = useNavigate(); 
    const [rastreo, setRastreo] = useState({
        id_ruta:"",
        latitud:"",
        longitud:"",
        distancia:"",
        fecha:"",
        id_punto:""
    });

    useEffect(() => {
        axios.get(`https://34.238.135.198/api/rastreo/${id_rastreo}`)
            .then(response => setRastreo(response.data))
            .catch(error => console.error(error));
    }, [id_rastreo]);

    const handleChange = (e) => {
        setRastreo({ ...rastreo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://34.238.135.198/api/rastreo/${id_rastreo}`, rastreo)
        .then(() => {
            alert("Rastreo actualizado");
            navigate("/crud_rastreo"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_rastreo"); 
    };

    return (
        <div>
            <div className="card shadow p-4" style={{ backgroundColor: "#d4edda" }}>
                <h2 className="text-center text-success">Editar Rastreo</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">ID Ruta</label>
                        <input type="text" className="form-control" name="id_ruta" value={rastreo.id_ruta} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Latitud</label>
                        <input type="text" className="form-control" name="latitud" value={rastreo.latitud} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Longitud</label>
                        <input type="text" className="form-control" name="longitud" value={rastreo.longitud} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Distancia</label>
                        <input type="text" className="form-control" name="distancia" value={rastreo.distancia} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input type="datetime-local" className="form-control" name="fecha" value={rastreo.fecha} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">ID Punto</label>
                        <input type="text" className="form-control" name="id_punto" value={rastreo.id_punto} onChange={handleChange} required />
                    </div>
                    <div className=" justify-content-between">
                        <button type="submit" className="btn btn-success">Actualizar Rastreo</button>
                        <button type="button" className="btn btn-secondary" onClick={handleRedirect}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit_rastreo;
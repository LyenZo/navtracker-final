import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit_ruta = () => {
    const { id_ruta } = useParams();
    const navigate = useNavigate(); 
    const [ruta, setRuta] = useState({
        id_conductor: "",
        id_pasajero: "",
        lat_inicio: "",
        lon_inicio: "",
        lat_final: "",
        lon_final: "",
        f_inicio: "",
        f_final: "",
        distancia: "",
    });

    useEffect(() => {
        axios.get(`https://api.navtracker.xdn.com.mx/api/ruta/${id_ruta}`)
            .then(response => setRuta(response.data))
            .catch(error => console.error(error));
    }, [id_ruta]);

    const handleChange = (e) => {
        setRuta({ ...ruta, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://api.navtracker.xdn.com.mx/api/ruta/${id_ruta}`, ruta)
        .then(() => {
            alert("Ruta actualizada");
            navigate("/crud_ruta"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_ruta"); 
    };

    return (
        <div >
            <div className="card shadow p-4" style={{ backgroundColor: "#d4edda" }}>
                <h2 className="text-center text-success">Editar Ruta</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">ID Conductor</label>
                        <input type="text" className="form-control" name="id_conductor" value={ruta.id_conductor} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">ID Pasajero</label>
                        <input type="text" className="form-control" name="id_pasajero" value={ruta.id_pasajero} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Latitud Inicio</label>
                        <input type="text" className="form-control" name="lat_inicio" value={ruta.lat_inicio} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Longitud Inicio</label>
                        <input type="text" className="form-control" name="lon_inicio" value={ruta.lon_inicio} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Latitud Final</label>
                        <input type="text" className="form-control" name="lat_final" value={ruta.lat_final} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Longitud Final</label>
                        <input type="text" className="form-control" name="lon_final" value={ruta.lon_final} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha Inicio</label>
                        <input type="datetime-local" className="form-control" name="f_inicio" value={ruta.f_inicio} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha Final</label>
                        <input type="datetime-local" className="form-control" name="f_final" value={ruta.f_final} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Distancia</label>
                        <input type="text" className="form-control" name="distancia" value={ruta.distancia} onChange={handleChange} required />
                    </div>
                    <div className=" justify-content-between">
                        <button type="submit" className="btn btn-success">Actualizar Ruta</button>
                        <button type="button" className="btn btn-secondary" onClick={handleRedirect}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit_ruta;

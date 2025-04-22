import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit_vehiculo = () => {
    const { id_vehiculo } = useParams();
    const navigate = useNavigate();
    const [vehiculo, setVehiculo] = useState({
        vehiculo: ""
    });

    useEffect(() => {
        axios.get(`https://api.navtracker.xdn.com.mx/api/vehiculo/${id_vehiculo}`)
            .then(response => setVehiculo(response.data))
            .catch(error => console.error(error));
    }, [id_vehiculo]);

    const handleChange = (e) => {
        setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/vehiculo/${id_vehiculo}`, vehiculo)
            .then(() => {
                alert("Vehículo actualizado");
                navigate("/crud_vehiculo");
            })
            .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_vehiculo");
    };

    return (
        <div>
            <div className="card shadow p-4" style={{ backgroundColor: "#d4edda" }}>
                <h2 className="text-center text-success">Editar Vehículo</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Vehículo</label>
                        <input
                            type="text"
                            className="form-control"
                            name="vehiculo"
                            value={vehiculo.vehiculo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="justify-content-between">
                        <button type="submit" className="btn btn-success">Actualizar Vehículo</button>
                        <button type="button" className="btn btn-secondary" onClick={handleRedirect}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit_vehiculo;
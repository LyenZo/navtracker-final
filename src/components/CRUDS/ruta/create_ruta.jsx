import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Create_ruta = () => {
    const [ruta, setRuta] = useState({
        id_conductor: "",
        id_pasajero: "",
        lat_inicio: "",
        lon_inicio: "",
        lat_final: "",
        lon_final: "",
        f_inicio: "",
        f_final: "",
        distancia: ""
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRuta({ ...ruta, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://api.navtracker.xdn.com.mx/api/ruta/", ruta);
            alert("Ruta registrado correctamente");
            setRuta({
                id_ruta: "",
                id_conductor: "",
                id_pasajero: "",
                lat_inicio: "",
                lon_inicio: "",
                lat_final: "",
                lon_final: "",
                f_inicio: "",
                f_final: "",
                distancia: ""
            });
        } catch (error) {
            console.error("Error al registrar ruta", error);
            alert("Error al registrar ruta");
        }
    };

    const handleNavigate = () => {
        navigate('/excel_ruta'); 
    };

    return (
        <div className="container mt-0 mb-0">
            <h2 className="text-center mb-4">Registro de Ruta</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="id_conductor" 
                        placeholder="ID conductor" 
                        value={ruta.id_conductor} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="id_pasajero" 
                        placeholder="ID pasajero" 
                        value={ruta.id_pasajero} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="lat_inicio" 
                        placeholder="Lat inicio" 
                        value={ruta.lat_inicio} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="lat_final" 
                        placeholder="Lat final" 
                        value={ruta.lat_final} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="lon_inicio" 
                        placeholder="Lon inicio" 
                        value={ruta.lon_inicio} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="lon_final" 
                        placeholder="Lon final" 
                        value={ruta.lon_final} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                <input 
                type="datetime-local" 
                name="f_inicio"  
                placeholder="Fecha Inicio" 
                value={ruta.f_inicio} 
                onChange={handleChange} 
                required 
                className="form-control"
            />
        </div>
        <div className="mb-3">
            <input 
                type="datetime-local"  
                name="f_final" 
                placeholder="Fecha Final" 
                value={ruta.f_final} 
                onChange={handleChange} 
                required 
                className="form-control"
            />
        </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="distancia" 
                        placeholder="Distancia" 
                        value={ruta.distancia} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn  w-100 mb-3" style={{color:"white",backgroundColor:"#1F6527"}}>
                    Registrar Ruta
                </button>
            </form>
        </div>
    );
};

export default Create_ruta;

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Create_rastreo = () => {
    const [rastreo, setRastreo] = useState({
        id_ruta:"",
        latitud:"",
        longitud:"",
        distancia:"",
        fecha:"",
        id_punto:""
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRastreo({ ...rastreo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://api.navtracker.xdn.com.mx/api/rastreo/", rastreo);
            alert("Rastreo registrado correctamente");
            setRastreo({
                id_ruta:"",
                latitud:"",
                longitud:"",
                distancia:"",
                fecha:"",
                id_punto:""
            });
        } catch (error) {
            console.error("Error al registrar rastreo", error);
            alert("Error al registrar rastreo");
        }
    };

    const handleNavigate = () => {
        navigate('/excel_rastreo'); 
    };

    return (
        <div className="container mt-0 mb-0">
            <h2 className="text-center mb-4">Registro de Rastreo</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="id_ruta" 
                        placeholder="ID Ruta" 
                        value={rastreo.id_ruta} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="latitud" 
                        placeholder="Latitud" 
                        value={rastreo.latitud} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="longitud" 
                        placeholder="Longitud" 
                        value={rastreo.longitud} 
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
                        value={rastreo.distancia} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="datetime-local" 
                        name="fecha" 
                        placeholder="Fecha" 
                        value={rastreo.fecha} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="id_punto" 
                        placeholder="ID punto" 
                        value={rastreo.id_punto} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn w-100 mb-3" style={{color:"white",backgroundColor:"#1F6527"}}>
                    Registrar Rastreo
                </button>
            </form>
        </div>
    );
};

export default Create_rastreo;

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/body.css"
const Create_punto = () => {
    const [punto, setPunto] = useState({
        nombre: "",
        latitud: "",
        longitud: "",
        direccion: ""
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPunto({ ...punto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://api.navtracker.xdn.com.mx/api/punto_ruta/", punto);
            alert("Punto de ruta registrado correctamente");
            setPunto({
                nombre: "",
                latitud: "",
                longitud: "",
                direccion: ""
            });
        } catch (error) {
            console.error("Error al registrar punto de ruta", error);
            alert("Error al registrar punto de ruta");
        }
    };

    const handleNavigate = () => {
        navigate('/excel_punto'); 
    };

    return (
        <div className="container mt-0 mb-0">
            <h2 className="text-center mb-4">Registro de Punto de ruta</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre" 
                        value={punto.nombre} 
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
                        value={punto.latitud} 
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
                        value={punto.longitud} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="direccion" 
                        placeholder="Dirección" 
                        value={punto.direccion} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn w-100 mb-3" style={{color:"white",backgroundColor:"#1F6527"}}>
                    Registrar Punto de ruta
                </button>
            </form>

        
        </div>
    );
};

export default Create_punto;

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Create_vehiculo = () => {
    const [vehiculo, setVehiculo] = useState({
        vehiculo:""
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehiculo({ ...vehiculo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://api.navtracker.xdn.com.mx/api/vehiculo/", vehiculo);
            alert("Vehiculo registrado correctamente");
            setVehiculo({
                vehiculo:""
            });
        } catch (error) {
            console.error("Error al registrar vehiculo", error);
            alert("Error al registrar vehiculo");
        }
    };

    const handleNavigate = () => {
        navigate('/excel_vehiculo'); 
    };

    return (
        <div className="container mt-0 mb-5">
            <h2 className="text-center mb-4">Registro de vehiculo</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="vehiculo" 
                        placeholder="Vehiculo" 
                        value={vehiculo.vehiculo} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn  w-100 mb-3" style={{color:"white",backgroundColor:"#1F6527"}}>
                    Registrar Vehiculo
                </button>
            </form>
        </div>
    );
};

export default Create_vehiculo;

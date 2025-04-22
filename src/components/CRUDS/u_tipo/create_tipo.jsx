import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Create_tipo = () => {
    const [tipo, setTipo] = useState({
        tipo: ""
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTipo({ ...tipo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://api.navtracker.xdn.com.mx/api/u_tipo/", tipo);
            alert("Tipo de usuario creado");
            setTipo({
                tipo: ""
            });
        } catch (error) {
            console.error("Error al registrar el tipo de usuario", error);
            alert("Error al registrar el tipo de usuario");
        }
    };

    const handleNavigate = () => {
        navigate('/excel_tipo'); 
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{color:"black"}}>Registro de Tipo de Usuario</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="tipo" 
                        placeholder="Tipo" 
                        value={tipo.tipo} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn w-100 mb-3" style={{color:"white",backgroundColor:"#1F6527"}}>
                    Registrar tipo de Usuario
                </button>
            </form>

        </div>
    );
};

export default Create_tipo;

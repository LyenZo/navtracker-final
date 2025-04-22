import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
const RecuperarPassword = () => {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        try {
            const response = await axios.post("https://api.navtracker.xdn.com.mx/api/recuperar-password", { email });
            setMensaje(response.data.message);
        } catch (error) {
            setMensaje("Hubo un problema. Intenta de nuevo.");
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            {mensaje && <p>{mensaje}</p>}
            <br />
            <h1 style={{ textAlign: "center" }}>
                El servicio no se encuentra disponible, intentalo más tarde
            </h1>
    
            <Link to="/login">
                <button className="btn btn-primary w-50" style={{backgroundColor:"#1F6527", borderColor:"green",margin: "20px auto",display: "block"}}>Volver al login</button>
            </Link>
        </div>
    );
    
};

export default RecuperarPassword;

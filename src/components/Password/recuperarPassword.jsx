import { useState } from "react";
import axios from "axios";

const RecuperarPassword = () => {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        try {
            const response = await axios.post("'https://api.navtracker.xdn.com.mx/api/recuperar-password", { email });
            setMensaje(response.data.message);
        } catch (error) {
            setMensaje("Hubo un problema. Intenta de nuevo.");
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit" >
                    Enviar enlace
                </button>
            </form>
        </div>
    );
};

export default RecuperarPassword;

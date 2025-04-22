import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RestablecerPassword = () => {
    const { token } = useParams(); 
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axios.post(`'https://api.navtracker.xdn.com.mx/api/restablecer-password/${token}`, {
                newPassword
            });

            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            setMessage(error.response?.data?.error || "Error al restablecer contraseña.");
        }
    };

    return (
        <div>
            <h2 >Restablecer Contraseña</h2>
            {message && <p >{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={handleChange}
                    required
                    
                />
                <button type="submit" >
                    Cambiar Contraseña
                </button>
            </form>
        </div>
    );
};

export default RestablecerPassword;

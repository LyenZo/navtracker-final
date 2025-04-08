import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/login.css"; 

const Login = () => {
    const [usuario, setUsuario] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("https://api.navtracker.xdn.com.mx/api/login", usuario);
            console.log("Respuesta de la API:", response.data);  // Para depuración
        
            // Cambiar 'access_token' por 'token'
            if (response.data.token) {  // Ahora buscamos 'token'
                localStorage.setItem("token", response.data.token);  // Guardamos el 'token'
                alert("Inicio de sesión exitoso");
                navigate("/perfil");
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error.response);  // Muestra detalles del error
            setError("Hubo un problema al iniciar sesión. Intenta de nuevo.");
        }
        
    };        

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-8 col-12">
                    <div className="carta">
                        <div className="card-body">
                            <h2 className="text-center">Inicio de Sesión</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="Email" 
                                        value={usuario.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        placeholder="Contraseña" 
                                        value={usuario.password} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" style={{backgroundColor:"#1F6527", borderColor:"green"}}>
                                    Iniciar Sesión
                                </button>
                            </form>
                            <Link to="/recuperar" className="btn btn-secondary w-100" style={{color:"white", marginTop:"10px"}}>
                            ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

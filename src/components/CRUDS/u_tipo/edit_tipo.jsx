import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit_tipo = () => {
    const { id_tipo } = useParams();
    const navigate = useNavigate(); 
    const [t_usuario, setTusuario] = useState({
        tipo: ""
    });

    useEffect(() => {
        axios.get(`https://api.navtracker.xdn.com.mx/api/u_tipo/${id_tipo}`)
            .then(response => setTusuario(response.data))
            .catch(error => console.error(error));
    }, [id_tipo]);

    const handleChange = (e) => {
        setTusuario({ ...t_usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://api.navtracker.xdn.com.mx/api/u_tipo/${id_tipo}`, t_usuario)
        .then(() => {
            alert("Tipo de usuario actualizado");
            navigate("/crud_tipo");
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_tipo");
    };

    return (
        <div>
            <div className="card shadow p-4" style={{ backgroundColor: "#d4edda" }}>
                <h2 className="text-center text-success">Editar Tipo de Usuario</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Tipo</label>
                        <input type="text" className="form-control" name="tipo" value={t_usuario.tipo} onChange={handleChange} required />
                    </div>
                    <div className="justify-content-between">
                        <button type="submit" className="btn btn-success">Actualizar Usuario</button>
                        <button type="button" className="btn btn-secondary" onClick={handleRedirect}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit_tipo;

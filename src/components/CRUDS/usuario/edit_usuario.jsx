import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit_usuario = () => {
    const { id_u } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombre: "",
        ap_pat: "",
        ap_mat: "",
        email: "",
        password: "",
        n_tel: "",
        id_tipo: "",
        id_vehiculo: "",
    });

    useEffect(() => {
        axios.get(`https://api.navtracker.xdn.com.mx/api/usuario/${id_u}`)
            .then(response => setUsuario(response.data))
            .catch(error => console.error(error));
    }, [id_u]);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/usuario/${id_u}`, usuario)
            .then(() => {
                alert("Usuario actualizado");
                navigate("/crud_usuario");
            })
            .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/list_usuario");
    };

    return (
        <div>
            <div className="card shadow p-4" style={{ backgroundColor: "#d4edda" }}>
                <h2 className="text-center text-success">Editar Usuario</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" name="nombre" value={usuario.nombre} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido Paterno</label>
                        <input type="text" className="form-control" name="ap_pat" value={usuario.ap_pat} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido Materno</label>
                        <input type="text" className="form-control" name="ap_mat" value={usuario.ap_mat} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" name="email" value={usuario.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número Telefónico</label>
                        <input type="text" className="form-control" name="n_tel" value={usuario.n_tel} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo de Usuario</label>
                        <input type="text" className="form-control" name="id_tipo" value={usuario.id_tipo} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Vehículo</label>
                        <input type="text" className="form-control" name="id_vehiculo" value={usuario.id_vehiculo} onChange={handleChange} required />
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

export default Edit_usuario;

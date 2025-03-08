import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const R_usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usuariosPerPage] = useState(5);
    const [filters, setFilters] = useState({
        nombre: "",
        ap_pat: "",
        ap_mat: "",
        email: "",
        id_tipo: ""
    });

    useEffect(() => {
        axios.get("http://localhost:3001/api/usuario/")
            .then(response => {
                setUsuarios(response.data);
                setFilteredUsuarios(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_u) => {
        axios.delete(`http://localhost:3001/api/usuario/${id_u}`)
            .then(() => setUsuarios(usuarios.filter(usuario => usuario.id_u !== id_u)))
            .catch(error => console.error(error));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        // Filtrar usuarios según los filtros aplicados
        const filtered = usuarios.filter(usuario => {
            return (
                usuario.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
                usuario.ap_pat.toLowerCase().includes(filters.ap_pat.toLowerCase()) &&
                usuario.ap_mat.toLowerCase().includes(filters.ap_mat.toLowerCase()) &&
                usuario.email.toLowerCase().includes(filters.email.toLowerCase()) &&
                (filters.id_tipo ? usuario.id_tipo === filters.id_tipo : true)
            );
        });
        setFilteredUsuarios(filtered);
        setCurrentPage(1); // Resetear la página a 1 al cambiar filtros
    }, [filters, usuarios]);

    const indexOfLastUsuario = currentPage * usuariosPerPage;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsuarios.length / usuariosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Usuarios</h2>

            {/* Filtros */}
            <div className="mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <input 
                            type="text" 
                            name="nombre" 
                            value={filters.nombre} 
                            onChange={handleFilterChange} 
                            placeholder="Filtrar por Nombre" 
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <input 
                            type="text" 
                            name="ap_pat" 
                            value={filters.ap_pat} 
                            onChange={handleFilterChange} 
                            placeholder="Filtrar por Apellido Paterno" 
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <input 
                            type="text" 
                            name="ap_mat" 
                            value={filters.ap_mat} 
                            onChange={handleFilterChange} 
                            placeholder="Filtrar por Apellido Materno" 
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <input 
                            type="email" 
                            name="email" 
                            value={filters.email} 
                            onChange={handleFilterChange} 
                            placeholder="Filtrar por Email" 
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-3">
                        <select 
                            name="id_tipo" 
                            value={filters.id_tipo} 
                            onChange={handleFilterChange} 
                            className="form-select"
                        >
                            <option value="">Filtrar por Tipo de Usuario</option>
                            <option value="1">Conductor</option>
                            <option value="2">Pasajero</option>
                            <option value="3">Administrador</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Email</th>
                        <th>Tipo Usuario</th>
                        <th>Vehículo</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.map(usuario => (
                        <tr key={usuario.id_u}>
                            <td>{usuario.id_u}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.ap_pat}</td>
                            <td>{usuario.ap_mat}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.id_tipo}</td>
                            <td>{usuario.id_vehiculo}</td>
                            <td>
                                <Link to={`/editar_usuario/${usuario.id_u}`} className="btn btn-warning btn-sm">
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(usuario.id_u)} className="btn btn-danger btn-sm">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <nav>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default R_usuario;

import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";

const R_tipo = () => {
    const [t_usuarios, setTusuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [usuariosPerPage, setUsuariosPerPage] = useState(5); 

    useEffect(() => {
        axios.get("https://api.navtracker.xdn.com.mx/api/u_tipo/")
            .then(response => setTusuarios(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_tipo) => {
        axios.delete(`https://api.navtracker.xdn.com.mx/api/u_tipo/${id_tipo}`)
            .then(() => setTusuarios(t_usuarios.filter(t_usuario => t_usuario.id_tipo !== id_tipo)))
            .catch(error => console.error(error));
    };

    // Obtener los tipos de usuario actuales a mostrar según la página
    const indexOfLastUsuario = currentPage * usuariosPerPage;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
    const currentUsuarios = t_usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(t_usuarios.length / usuariosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h2 className="table-title"style={{color:"black"}}>Lista de Tipos de Usuario</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>ID</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Tipo</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Editar</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.map(t_usuario => (
                        <tr key={t_usuario.id_tipo}>
                            <td>{t_usuario.id_tipo}</td>
                            <td>{t_usuario.tipo}</td>
                            <td>
                                <Link to={`/edit_tipo/${t_usuario.id_tipo}`}>
                                    <button className="btn btn-success">Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleDelete(t_usuario.id_tipo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="pagination-container">
                <nav>
                    <ul className="pagination">
                        {pageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <button 
                                    className={`page-link ${currentPage === number ? 'active' : ''}`}
                                    onClick={() => paginate(number)}
                                    style={{ color: "white", backgroundColor: "#1F6527", borderColor: "#1F6527" }}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <style jsx>{`
                .container {
                    max-width: 80%;
                    margin: auto;
                    padding: 30px;
                }

                .table-title {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #4CAF50;
                    font-size: 2rem;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }

                tr:hover {
                    background-color: #f1f1f1;
                }

                .btn {
                    padding: 8px 16px;
                    font-size: 14px;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .btn-warning {
                    background-color: #ff9800;
                    color: white;
                }

                .btn-danger {
                    background-color: #f44336;
                    color: white;
                }

                .btn:hover {
                    opacity: 0.8;
                }

                .pagination-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }

                .pagination {
                    list-style-type: none;
                    padding: 0;
                    display: flex;
                }

                .page-item {
                    margin: 0 5px;
                }

                .page-link {
                    padding: 10px 15px;
                    background-color: #f1f1f1;
                    border: 1px solid #ddd;
                    color: #333;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .page-link:hover {
                    background-color: #e0e0e0;
                }

                .active {
                    background-color: #4CAF50;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default R_tipo;

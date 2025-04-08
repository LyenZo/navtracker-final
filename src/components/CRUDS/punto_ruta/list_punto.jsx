import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";  // Opción si usas Bootstrap para algunos estilos
import "../../css/list_punto.css";

const List_punto = () => {
    const [puntos, setPuntos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [pointsPerPage, setPointsPerPage] = useState(5); 

    useEffect(() => {
        axios.get("https://api.navtracker.xdn.com.mx/api/punto_ruta/")
            .then(response => setPuntos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_punto) => {
        axios.delete(`https://api.navtracker.xdn.com.mx/api/punto_ruta/${id_punto}`)
            .then(() => setPuntos(puntos.filter(punto => punto.id_punto !== id_punto)))
            .catch(error => console.error(error));
    };

    const indexOfLastPoint = currentPage * pointsPerPage;
    const indexOfFirstPoint = indexOfLastPoint - pointsPerPage;
    const currentPoints = puntos.slice(indexOfFirstPoint, indexOfLastPoint);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(puntos.length / pointsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container custom-container">
            <h2 className="text-center">Lista de Puntos</h2>

            <table className="table table-striped table-bordered custom-table" >
                <thead>
                    <tr>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>ID</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Nombre</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Latitud</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Longitud</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Dirección</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Editar</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPoints.map(punto => (
                        <tr key={punto.id_punto}>
                            <td>{punto.id_punto}</td>
                            <td>{punto.nombre}</td>
                            <td>{punto.latitud}</td>
                            <td>{punto.longitud}</td>
                            <td>{punto.direccion}</td>
                            <td>
                                <Link to={`/edit_punto/${punto.id_punto}`}>
                                    <button className="btn btn-success btn-sm" style={{color:"white"}}>Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-success" 
                                    onClick={() => handleDelete(punto.id_punto)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="pagination-container">
            <nav>
                <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                    <button
                        className="page-link"
                        onClick={() => paginate(number)}
                        style={{ color: "white", backgroundColor: "#1F6527", borderColor: "#1F6527" }} // Aplicar estilo aquí
                    >
                        {number}
                    </button>
                    </li>
                ))}
                </ul>
            </nav>
            </div>


        </div>
    );
};

export default List_punto;

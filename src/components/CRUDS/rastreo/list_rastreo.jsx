import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";  // Opción si usas Bootstrap para algunos estilos
import "../../css/list_rastreo.css";

const R_rastreo = () => {
    const [rastreos, setRastreos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rastreosPerPage, setRastreosPerPage] = useState(5);

    // Función para obtener los rastreos desde la API
    const fetchRastreos = () => {
        axios.get("https://34.238.135.198/api/rastreo")
            .then(response => setRastreos(response.data))
            .catch(error => console.error(error));
    };

    // Llamamos a la API cuando el componente se monta
    useEffect(() => {
        fetchRastreos();  // Obtiene los rastreos iniciales
        
        // Configuración para actualizar los rastreos cada 5 segundos
        const interval = setInterval(fetchRastreos, 5000);  // Actualiza cada 5 segundos

        // Limpiamos el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    // Función para manejar la eliminación de un rastreo
    const handleDelete = (id_rastreo) => {
        axios.delete(`http://3.88.222.39/api/rastreo${id_rastreo}`)
            .then(() => setRastreos(rastreos.filter(rastreo => rastreo.id_rastreo !== id_rastreo)))
            .catch(error => console.error(error));
    };

    // Paginación
    const indexOfLastRastreo = currentPage * rastreosPerPage;
    const indexOfFirstRastreo = indexOfLastRastreo - rastreosPerPage;
    const currentRastreos = rastreos.slice(indexOfFirstRastreo, indexOfLastRastreo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rastreos.length / rastreosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container custom-container">
            <h2 className="text-center">Lista de Rastreos</h2>

            <table className="table table-striped table-bordered custom-table">
                <thead>
                    <tr>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>ID Rastreo</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Latitud</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Longitud</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Hora</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Mapa</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRastreos.map(rastreo => (
                        <tr key={rastreo.id_rastreo}>
                            <td>{rastreo.id_rastreo}</td>
                            <td>{rastreo.lat}</td>
                            <td>{rastreo.lng}</td>
                            <td>{rastreo.hora}</td>
                            <td>
                                <Link to={`/mapa_rastreo`}>
                                    <button className="btn btn-success btn-sm">Mapa</button>
                                </Link>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-success btn-sm" 
                                    onClick={() => handleDelete(rastreo.id_rastreo)}
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
                                    style={{ color: "white", backgroundColor: "#1F6527", borderColor: "#1F6527" }}
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

export default R_rastreo;

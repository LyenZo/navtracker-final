import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";  // Opción si usas Bootstrap para algunos estilos
import "../../css/list_ruta.css"

const R_ruta = () => {
    const [rutas, setRutas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [rutasPerPage, setRutasPerPage] = useState(5); 

    useEffect(() => {
        axios.get("https://api.navtracker.xdn.com.mx/api/ruta/")
            .then(response => setRutas(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_ruta) => {
        axios.delete(`'https://api.navtracker.xdn.com.mx/api/ruta/${id_ruta}`)
            .then(() => setRutas(rutas.filter(ruta => ruta.id_ruta !== id_ruta)))
            .catch(error => console.error(error));
    };

    const indexOfLastRuta = currentPage * rutasPerPage;
    const indexOfFirstRuta = indexOfLastRuta - rutasPerPage;
    const currentRutas = rutas.slice(indexOfFirstRuta, indexOfLastRuta);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rutas.length / rutasPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container custom-container">
            <h2 className="text-center">Lista de Rutas</h2>

            <table className="table table-striped table-bordered custom-table">
                <thead>
                    <tr>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>ID Ruta</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>ID Conductor</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>ID Pasajero</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Latitud Inicio</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Longitud Inicio</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Latitud Final</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Longitud Final</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Fecha Inicio</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Fecha Final</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Distancia</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Editar</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRutas.map(ruta => (
                        <tr key={ruta.id_ruta}>
                            <td>{ruta.id_ruta}</td>
                            <td>{ruta.id_conductor}</td>
                            <td>{ruta.id_pasajero}</td>
                            <td>{ruta.lat_inicio}</td>
                            <td>{ruta.lon_inicio}</td>
                            <td>{ruta.lat_final}</td>
                            <td>{ruta.lon_final}</td>
                            <td>{ruta.f_inicio}</td>
                            <td>{ruta.f_final}</td>
                            <td>{ruta.distancia}</td>
                            <td>
                                <Link to={`/edit_ruta/${ruta.id_ruta}`}>
                                    <button className="btn btn-success btn-sm">Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-success btn-sm" 
                                    onClick={() => handleDelete(ruta.id_ruta)}
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

export default R_ruta;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const List_vehiculo = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [vehiculosPerPage, setVehiculosPerPage] = useState(5); 

    useEffect(() => {
        axios.get("https://api.navtracker.xdn.com.mx/api/vehiculo/")
            .then(response => setVehiculos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_vehiculo) => {
        axios.delete(`https://api.navtracker.xdn.com.mx/api/vehiculo/${id_vehiculo}`)
            .then(() => setVehiculos(vehiculos.filter(vehiculo => vehiculo.id_vehiculo !== id_vehiculo)))
            .catch(error => console.error(error));
    };

    const indexOfLastVehiculo = currentPage * vehiculosPerPage;
    const indexOfFirstVehiculo = indexOfLastVehiculo - vehiculosPerPage;
    const currentVehiculos = vehiculos.slice(indexOfFirstVehiculo, indexOfLastVehiculo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(vehiculos.length / vehiculosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h2 className="table-title"style={{color:"black"}}>Lista de Vehículos</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>ID</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Vehículo</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Editar</th>
                        <th style={{color:"white",backgroundColor:"#1F6527"}}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentVehiculos.map(vehiculo => (
                        <tr key={vehiculo.id_vehiculo} >
                            <td >{vehiculo.id_vehiculo}</td>
                            <td >{vehiculo.vehiculo}</td>
                            <td >
                                <Link to={`/edit_vehiculo/${vehiculo.id_vehiculo}`}>
                                    <button className="btn btn-success">Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleDelete(vehiculo.id_vehiculo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="pagination-container">
                <nav>
                    <ul className="pagination" >
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
        </div>
    );
};

export default List_vehiculo;

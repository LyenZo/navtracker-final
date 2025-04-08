import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Registrar los elementos de Chart.js que vamos a usar
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

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
        axios.get("https://api.navtracker.xdn.com.mx/api/usuario/")
            .then(response => {
                setUsuarios(response.data);
                setFilteredUsuarios(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_u) => {
        axios.delete(`https://api.navtracker.xdn.com.mx/api/usuario/${id_u}`)
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

    // Contar los tipos de usuario
    const countTipoUsuarios = (usuarios) => {
        const tiposCount = { 1: 0, 2: 0, 3: 0 }; // Conductor: 1, Pasajero: 2, Administrador: 3
        usuarios.forEach(usuario => {
            if (usuario.id_tipo === 1) tiposCount[1]++;
            if (usuario.id_tipo === 2) tiposCount[2]++;
            if (usuario.id_tipo === 3) tiposCount[3]++;
        });
        return tiposCount;
    };

    const tiposCount = countTipoUsuarios(filteredUsuarios);

    // Datos para la gráfica de pastel
    const pieData = {
        labels: ['Conductores', 'Pasajeros', 'Administradores'],
        datasets: [
            {
                data: [tiposCount[1], tiposCount[2], tiposCount[3]],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverOffset: 4
            }
        ]
    };

    const exportToPDF = () => {
        const input = document.getElementById("pdf-content");

        // Usar html2canvas para convertir el HTML en imagen
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const doc = new jsPDF();
            doc.addImage(imgData, "PNG", 10, 10, 180, 160); // Ajusta la posición y tamaño de la imagen
            doc.save("usuarios.pdf");
        });
    };

    return (
        <div className="container mt-4 mb-0">
            <h2 className="text-center mb-4">Lista de Usuarios</h2>

            {/* Botón para exportar a PDF */}
            <div className="text-right mb-4">
                <button className="btn" style={{color:"white",backgroundColor:"#1F6527"}} onClick={exportToPDF}>
                    Exportar a PDF
                </button>
            </div>

            {/* Contenedor de la página que se va a exportar */}
            <div id="pdf-content">
                <div className="mb-4 text-center" style={{ maxWidth: "250px", margin: "auto" }}>
                    <h4>Distribución de Tipos de Usuario</h4>
                    <Pie data={pieData} />
                </div>

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
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>ID</th>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>Nombre</th>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>Apellido Paterno</th>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>Apellido Materno</th>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>Email</th>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>Tipo Usuario</th>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>Vehículo</th>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>Editar</th>
                            <th style={{color:"white",backgroundColor:"#1F6527"}}>Eliminar</th>
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
            <Link to={`/edit_usuario/${usuario.id_u}`} className="btn btn-success btn-sm">
            Editar
            </Link>
        </td>
        <td>
            <button onClick={() => handleDelete(usuario.id_u)} className="btn btn-success btn-sm">
            Eliminar
            </button>
        </td>
        </tr>
    ))}
    </tbody>
</table>
</div>


                {/* Paginación */}
                <nav>
                    <ul className="pagination justify-content-center">
                        {pageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <button onClick={() => paginate(number)} className="page-link"
                                    style={{ color: "white", backgroundColor: "#1F6527", borderColor: "#1F6527" }}>
                                    
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

export default R_usuario;

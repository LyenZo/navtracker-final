import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Create_vehiculo from "../components/CRUDS/vehiculo/create_vehiculo";
import List_vehiculo from "../components/CRUDS/vehiculo/list_vehiculo";
import Excel_vehiculo from "../components/CRUDS/vehiculo/excel_vehiculo";
import N_global_m from "../components/recursos/n_global_m2";

const Crud_vehiculo = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768); // Consideramos móvil cuando el ancho es <= 768px
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return () => window.removeEventListener("resize", checkScreenSize);
        }

        const fetchUsuario = async () => {
            try {
                const response = await axios.get("https://api.navtracker.xdn.com.mx/api/perfil", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsuario(response.data);
            } catch (error) {
                setError("Hubo un problema al cargar el perfil.");
            }
        };

        fetchUsuario();
    }, [navigate]);

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (!usuario) {
        return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div><p>Cargando perfil...</p></div>;
    }

    // Si el id_tipo no es 3 (no es un administrador), redirigimos al inicio
    if (usuario.id_tipo !== 3) {
        navigate("/");
        return null; // Evita renderizar el contenido si no es admin
    }

    return (
        <div>
            <Create_vehiculo />
            <List_vehiculo />
            <Excel_vehiculo />
            {isMobile && <N_global_m />} {/* Solo mostrar N_global_m si es móvil */}
        </div>
    );
};

export default Crud_vehiculo;

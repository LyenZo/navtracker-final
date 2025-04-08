import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Create_usuario from "../components/CRUDS/usuario/create_usuario";
import List_usuario from "../components/CRUDS/usuario/list_usuario";
import Excel_usuario from "../components/CRUDS/usuario/excel_usuario";
import N_global_m from "../components/recursos/n_global_m";

const Crud_usuario = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificamos si el dispositivo es móvil
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768); // Consideramos móvil cuando el ancho es <= 768px
        };

        // Llamamos la función al montarse el componente
        checkScreenSize();
        
        // Evento de resize
        window.addEventListener("resize", checkScreenSize);

        // Limpiar el listener cuando el componente se desmonte
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []); // Esta parte solo se ejecuta una vez

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        // Si no existe el token, redirigimos al login
        if (!token) {
            navigate("/");
            return;
        }

        // Si el token existe, intentamos cargar el perfil
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
    }, [navigate]); // Ejecuta este efecto cuando el componente se monta

    // Si hay un error, mostramos el mensaje
    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    // Si el usuario no está cargado, mostramos el spinner de carga
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
            <Create_usuario />
            <List_usuario />
            <Excel_usuario />
            {isMobile && <N_global_m />} {/* Solo mostrar N_global_m si es móvil */}
        </div>
    );
};

export default Crud_usuario;

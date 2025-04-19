import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import N_global_m from "../components/recursos/n_global_m2";
import Menu_sesion from "../components/recursos/menu_sesion";
import Menu_cruds from "../components/menu_cruds"; 
import Credencial from "../components/credencial"; 

const Sesion = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    // Verificamos si hay token en el localStorage
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768); 
        };

        checkScreenSize(); // Llamamos a la función inmediatamente
        window.addEventListener("resize", checkScreenSize); // Agregamos el evento de resize

        return () => window.removeEventListener("resize", checkScreenSize); // Limpiamos el evento al desmontar
    }, []);

    // Si hay token, tratamos de cargar los datos del usuario
    useEffect(() => {
        if (token) {
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

            fetchUsuario(); // Llamamos la función para obtener los datos del usuario
        }
    }, [token]);

    // Si ocurre un error, mostramos el mensaje de error
    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    // Si no hay token, mostramos solo Menu_sesion y N_global_m
    if (!token) {
        return (
            <div>
                <Menu_sesion /> {/* Menú para sesiones sin autenticación */}
                <N_global_m /> {/* Mostrar el componente global siempre */}
            </div>
        );
    }

    // Mientras cargamos el usuario, mostramos un mensaje de carga
    if (!usuario) {
        return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div><p>Cargando perfil...</p></div>;
    }

    // Si hay un token, mostramos los componentes correspondientes según el tipo de usuario
    return (
        <div>
            {usuario.id_tipo === 3 && <Menu_cruds />} {/* Administrador */}
            {(usuario.id_tipo === 1 || usuario.id_tipo === 2) && <Credencial />} {/* Conductor o Pasajero */}
            {/* No mostrar Menu_sesion si se está mostrando Credencial */}
            {(usuario.id_tipo !== 1 && usuario.id_tipo !== 2 && usuario.id_tipo !== 3) && isMobile && <Menu_sesion />} {/* Menú para móviles solo si no es Conductor o Pasajero */}
            {isMobile && <N_global_m />} {/* Componente global siempre visible */}
        </div>
    );
};

export default Sesion;

import React, { useState, useEffect } from "react";
import N_global_m from "../components/recursos/n_global_m";
import R_rastreo from "../components/CRUDS/rastreo/list_rastreo";
import Menu_sesion from "../components/recursos/menu_sesion"; // Asegúrate de importar el componente

const Rastreos = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Verificar si hay un token en el localStorage o sessionStorage
    const token = localStorage.getItem("token"); // O sessionStorage.getItem("token")
    setHasToken(!!token); // Si hay un token, hasToken será true, si no, será false

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      {hasToken && <R_rastreo />} {/* Muestra R_rastreo solo si hay token */}
      {!hasToken && <Menu_sesion />} {/* Muestra Menu_sesion si no hay token */}
      {isMobile && <N_global_m />}
    </div>
  );
};

export default Rastreos;

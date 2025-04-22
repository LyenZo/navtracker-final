import React, { useState, useEffect } from "react";
import N_global_m from "../components/recursos/n_global_m2";
import M_rastreo from "../components/CRUDS/rastreo/mapa_rastreo";
const Ma_rastreo = () => {
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    
    const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768); 
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
}, []);

return (
    <div>
        <M_rastreo />
        {isMobile && <N_global_m />}
    </div>
);
};

export default Ma_rastreo;

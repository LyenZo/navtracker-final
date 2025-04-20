import React, { useState, useEffect } from "react";
import N_global_m from "../components/recursos/n_global_m2";
import Create_usuario from "../components/CRUDS/usuario/create_usuario";

const Create_usuario_p = () => {
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
    {!isMobile && <Create_usuario />} 
    {isMobile && <Create_usuario />} 
    {isMobile && <N_global_m />} 
    </div>
);
};

export default Create_usuario_p;

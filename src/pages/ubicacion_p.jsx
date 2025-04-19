import React, { useState, useEffect } from "react";
import N_global_m from "../components/recursos/n_global_m2";
import Ubicacion from "../components/recursos/ubicacion";
const Home = () => {
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
        <Ubicacion />
        {isMobile && <N_global_m />}
    </div>
);
};

export default Home;

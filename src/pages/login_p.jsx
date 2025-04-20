import React, { useState, useEffect } from "react";
import Login from "../components/login";
import N_global_m from "../components/recursos/n_global_m2";

const Login_p = () => {
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
    {!isMobile && <Login />} 
    {isMobile && <Login />} 
    {isMobile && <N_global_m />} 
    </div>
);
};

export default Login_p;

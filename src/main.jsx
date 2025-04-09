import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Home
import Home from "./pages/home";
//punto_ruta
import Create_punto from "./components/CRUDS/punto_ruta/create_punto";
import List_punto from "./components/CRUDS/punto_ruta/list_punto";
import Edit_punto from "./components/CRUDS/punto_ruta/edit_punto";
import Crud_punto from "./pages/crud_punto";
//rastreo
import Create_rastreo from "./components/CRUDS/rastreo/create_rastreo";
import List_rastreo from "./components/CRUDS/rastreo/list_rastreo";
import Edit_rastreo from "./components/CRUDS/rastreo/edit_rastreo";
import Crud_rastreo from "./pages/crud_rastreo";
//ruta
import Create_ruta from "./components/CRUDS/ruta/create_ruta";
import List_ruta from "./components/CRUDS/ruta/list_ruta";
import Edit_ruta from "./components/CRUDS/ruta/edit_ruta";
import Crud_ruta from "./pages/crud_ruta";
//u_tipo
import Create_tipo from "./components/CRUDS/u_tipo/create_tipo";
import List_tipo from "./components/CRUDS/u_tipo/list_tipo";
import Edit_tipo from "./components/CRUDS/u_tipo/edit_tipo";
import Crud_tipo from "./pages/crud_tipo";
//usuario
import Excel_usuario from "./components/CRUDS/usuario/excel_usuario";
import Create_usuario from "./components/CRUDS/usuario/create_usuario";
import List_usuario from "./components/CRUDS/usuario/list_usuario";
import Edit_usuario from "./components/CRUDS/usuario/edit_usuario";
import Crud_usuario from "./pages/crud_usuario";
//vehiculo
import Create_vehiculo from "./components/CRUDS/vehiculo/create_vehiculo";
import List_vehiculo from "./components/CRUDS/vehiculo/list_vehiculo";
import Edit_vehiculo from "./components/CRUDS/vehiculo/edit_vehiculo";
import Crud_vehiculo from "./pages/crud_vehiculo";
//Login
import Login from "./components/login";
//Password
import RecuperarPassword from "./components/password/recuperarPassword";
import RestablecerPassword from "./components/password/restablecerPassword";
import Perfil from "./pages/perfil";
//movil
import Sesion from "./pages/sesion";
import Login_p from "./pages/login_p"
import Create_usuario_p from "./pages/create_usuario_p";
//ubicacion
import Ubicacion from "./pages/ubicacion_p";
//Rastreos
import Rastreos from "./pages/rastreos_p";
//Mapa rastreo
import Map from "./components/CRUDS/rastreo/mapa_rastreo";




ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      
      {/* <!-- Home --> */}
      <Route path="/" element={<Home />} />
      {/* <!-- punto_ruta --> */}
      <Route path="/create_punto" element={<Create_punto />} />
      <Route path="/list_punto" element={<List_punto />} />
      <Route path="/edit_punto/:id_punto" element={<Edit_punto />} />
      <Route path="/crud_punto" element={<Crud_punto />} />
      {/* <!-- rastreo --> */}
      <Route path="/create_rastreo" element={<Create_rastreo />} />
      <Route path="/list_rastreo" element={<List_rastreo />} />
      <Route path="/edit_rastreo/:id_rastreo" element={<Edit_rastreo />} />
      <Route path="/crud_rastreo" element={<Crud_rastreo />} />
      {/* <!-- ruta --> */}
      <Route path="/create_ruta" element={<Create_ruta />} />
      <Route path="/list_ruta" element={<List_ruta />} />
      <Route path="/edit_ruta/:id_ruta" element={<Edit_ruta />} />
      <Route path="/crud_ruta" element={<Crud_ruta />} />
      {/* <!-- u_tipo --> */}
      <Route path="/create_tipo" element={<Create_tipo />} />
      <Route path="/list_tipo" element={<List_tipo />} />
      <Route path="/edit_tipo/:id_tipo" element={<Edit_tipo />} />
      <Route path="/crud_tipo" element={<Crud_tipo />} />
      {/* <!-- usuario --> */}
      <Route path="/excel_usuario" element={<Excel_usuario />} />
      <Route path="/create_usuario" element={<Create_usuario_p />} />
      <Route path="/list_usuario" element={<List_usuario />} />
      <Route path="/edit_usuario/:id_u" element={<Edit_usuario />} />
      <Route path="/crud_usuario" element={<Crud_usuario />} />
      {/* <!-- vehiculo --> */}
      <Route path="/create_vehiculo" element={<Create_vehiculo />} />
      <Route path="/list_vehiculo" element={<List_vehiculo />} />
      <Route path="/edit_vehiculo/:id_vehiculo" element={<Edit_vehiculo />} />
      <Route path="/crud_vehiculo" element={<Crud_vehiculo />} />
      {/* <!-- Login --> */}
      <Route path="/login" element={<Login_p />} />
      {/* <!-- Password --> */}
      <Route path="/recuperar" element={<RecuperarPassword />} />
      <Route path="/restablecer-password/:token" element={<RestablecerPassword />} />
      <Route path="/perfil" element={<Perfil />} />
      {/* <!-- Movil -->*/}
      <Route path="/sesion" element={<Sesion />} />
      {/* <!-- Ubicacion -->*/}
      <Route path="/ubicacion" element={<Ubicacion />} />
      {/* <!-- Rastreos -->*/}
      <Route path="/rastreos" element={<Rastreos />} />
      {/* <!-- Mapa Rastreo -->*/}
      <Route path="/mapa_rastreo" element={<Map />} />
    </Routes>
  </BrowserRouter>
)
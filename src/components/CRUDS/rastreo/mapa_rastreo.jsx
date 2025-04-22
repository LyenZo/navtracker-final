import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/list_rastreo.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const M_rastreo = () => {
    const [rastreos, setRastreos] = useState([]);
    const [selectedRastreo, setSelectedRastreo] = useState(null); // Asegúrate de usar null en lugar de un arreglo vacío

    // Función para obtener los rastreos de la API
    const fetchRastreos = () => {
        axios.get("https://34.238.135.198/api/rastreo")
            .then(response => setRastreos(response.data))  // Guarda los datos en el estado
            .catch(error => console.error("Error fetching data", error));
    };

    // Usamos useEffect para obtener los datos cuando el componente se monta
    useEffect(() => {
        fetchRastreos();
        const interval = setInterval(fetchRastreos, 10000); // Actualizamos cada segundo
        return () => clearInterval(interval); // Limpiamos el intervalo cuando el componente se desmonte
    }, []);

    // Estilo para el contenedor del mapa
    const mapContainerStyle = {
        width: '100%',
        height: '500px',  // Asegúrate de que el contenedor tiene altura suficiente
    };

    // Si hay un rastreo seleccionado, usamos esas coordenadas; si no, usamos (0, 0)
    const center = selectedRastreo
        ? { lat: parseFloat(selectedRastreo.lat), lng: parseFloat(selectedRastreo.lng) }
        : { lat: 0, lng: 0 };

    console.log("Centro del mapa:", center);  // Para verificar las coordenadas que se están pasando

    return (
        <div className="container custom-container">
            <h2 className="text-center">Mapa de Rastreo</h2>

            <table className="table table-striped table-bordered custom-table">
                <thead>
                    <tr>
                        <th style={{ color: "white", backgroundColor: "#1F6527" }}>ID Rastreo</th>
                        <th style={{ color: "white", backgroundColor: "#1F6527" }}>Latitud</th>
                        <th style={{ color: "white", backgroundColor: "#1F6527" }}>Longitud</th>
                        <th style={{ color: "white", backgroundColor: "#1F6527" }}>Altitud</th>
                        <th style={{ color: "white", backgroundColor: "#1F6527" }}>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {rastreos.map(rastreo => (
                        <tr
                            key={rastreo.id_rastreo}
                            onClick={() => setSelectedRastreo(rastreo)} // Actualizamos el rastreo seleccionado
                            style={{ cursor: 'pointer' }} // Estilo para indicar que es clickeable
                        >
                            <td>{rastreo.id_rastreo}</td>
                            <td>{rastreo.lat}</td>
                            <td>{rastreo.lng}</td>
                            <td>{rastreo.altitud}</td>
                            <td>{rastreo.hora}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mostrar el mapa solo cuando hay un rastreo seleccionado */}
            {selectedRastreo && (
                <div className="map-container">
                    <h3>Ubicación del Rastreo</h3>
                    <LoadScript googleMapsApiKey="AIzaSyDktv1rMm6g_U6ShynYlKVhENklylQ671k">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center} // Usamos las coordenadas seleccionadas
                            zoom={18} // Puedes ajustar el nivel de zoom aquí
                        >
                            <Marker position={center} /> {/* Marcador en las coordenadas seleccionadas */}
                        </GoogleMap>
                    </LoadScript>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            )}

            {/* Mostrar el mapa siempre con el centro en (0, 0) */}
            {!selectedRastreo && (
                <div className="map-container">
                    <h3>Ubicación por defecto (0, 0)</h3>
                    <LoadScript googleMapsApiKey="AIzaSyDktv1rMm6g_U6ShynYlKVhENklylQ671k">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={{ lat: 0, lng: 0 }} // El mapa se centra en (0, 0) si no hay selección
                            zoom={2} // Zoom alejado para ver el mundo
                        >
                            <Marker position={{ lat: 0, lng: 0 }} />
                        </GoogleMap>
                    </LoadScript>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            )}
        </div>
    );
};

export default M_rastreo;

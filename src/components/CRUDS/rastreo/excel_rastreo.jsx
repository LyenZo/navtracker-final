import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import "bootstrap/dist/css/bootstrap.min.css";

const Excel_rastreo = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      
      const rows = XLSX.utils.sheet_to_json(sheet);

      console.log(rows);

      try {
        for (const row of rows) {
          const { id_ruta, latitud, longitud, distancia, fecha, id_punto } = row;

          // Si alguno de los valores es obligatorio, puedes agregar validación antes de enviar la solicitud
          if (!id_ruta || !latitud || !longitud || !distancia || !fecha || !id_punto) {
            alert('Faltan datos en la fila');
            continue; // Omite el envío de esta fila si falta algún dato
          }

          const rastreo = {
            id_ruta,
            latitud,
            longitud,
            distancia,
            fecha,
            id_punto
          };

          await axios.post('https://34.238.135.198/api/rastreo', rastreo);
        }
        alert('Datos cargados correctamente');
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un error al cargar los datos');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cargar datos desde Excel</h2>

      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">Selecciona el archivo Excel</label>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          className="form-control" 
          onChange={handleFileChange} 
          id="fileInput"
        />
      </div>

      <div className="text-center">
        <button 
          onClick={handleUpload} 
          className="btn" style={{color:"white",backgroundColor:"#1F6527"}}
        >
          Subir
        </button>
      </div>
    </div>
  );
};

export default Excel_rastreo;

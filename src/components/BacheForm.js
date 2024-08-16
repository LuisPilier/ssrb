import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate en lugar de useHistory
import supabase from '../supabaseClient';
import Swal from 'sweetalert2';
import { FaMapMarkerAlt, FaArrowsAltH, FaMapPin, FaBuilding } from 'react-icons/fa';

const BacheForm = ({ onSubmit }) => {
  const [calle, setCalle] = useState('');
  const [tamaño, setTamaño] = useState('');
  const [posición, setPosición] = useState('');
  const [distrito, setDistrito] = useState('');

  const navigate = useNavigate(); // Usar el hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('baches')
      .insert([
        {
          calle,
          tamaño: parseInt(tamaño, 10),
          posición,
          distrito,
          prioridad: parseInt(tamaño, 10),
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting bache:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Hubo un problema al insertar el bache.',
        confirmButtonText: 'Aceptar',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'El bache se ha insertado correctamente.',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        onSubmit(data[0]);
        setCalle('');
        setTamaño('');
        setPosición('');
        setDistrito('');
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
      <button
        onClick={() => navigate('/')} // Navegar al home usando navigate
        className="mb-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
      >
        Volver al Inicio
      </button>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Agregar Nuevo Bache</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <span className="p-2 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <FaMapMarkerAlt />
          </span>
          <input
            type="text"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
            className="w-full border-none p-2 text-gray-700 rounded-r-lg"
            placeholder="Calle"
            required
          />
        </div>
        
        <div className="mb-4 flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <span className="p-2 bg-green-500 text-white rounded-full flex items-center justify-center">
            <FaArrowsAltH />
          </span>
          <input
            type="number"
            min="1"
            max="10"
            value={tamaño}
            onChange={(e) => setTamaño(e.target.value)}
            className="w-full border-none p-2 text-gray-700 rounded-r-lg"
            placeholder="Tamaño (1-10)"
            required
          />
        </div>
        
        <div className="mb-4 flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <span className="p-2 bg-yellow-500 text-white rounded-full flex items-center justify-center">
            <FaMapPin />
          </span>
          <input
            type="text"
            value={posición}
            onChange={(e) => setPosición(e.target.value)}
            className="w-full border-none p-2 text-gray-700 rounded-r-lg"
            placeholder="Posición"
            required
          />
        </div>
        
        <div className="mb-6 flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <span className="p-2 bg-red-500 text-white rounded-full flex items-center justify-center">
            <FaBuilding />
          </span>
          <input
            type="text"
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
            className="w-full border-none p-2 text-gray-700 rounded-r-lg"
            placeholder="Distrito"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Añadir Bache
        </button>
      </form>
    </div>
  );
};

export default BacheForm;

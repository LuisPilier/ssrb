import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia a useNavigate
import BacheList from '../components/BacheList';
import ReparacionForm from '../components/ReparacionForm';
import ReparacionList from '../components/ReparacionList';

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Usa useNavigate para redirigir

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goToHome = () => {
    navigate('/'); // Cambia la ruta a la página de inicio según sea necesario
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-poppins">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración de Baches</h1>
      <div className="mb-12 flex space-x-4">
        <button
          onClick={goToHome}
          className="bg-gray-600 text-white py-2 px-4 rounded shadow hover:bg-gray-700 transition duration-300"
        >
          Volver a Inicio
        </button>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-300"
        >
          Registrar Reparación
        </button>
      </div>
      <div className="mb-12">
        <BacheList />
      </div>
      <div className="mb-12">
        <ReparacionList/>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Registrar Nueva Reparación</h2>
            <ReparacionForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaRoad } from 'react-icons/fa'; // Correctly importing the FaRoad icon

const Home = () => {
  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center px-4 py-8 space-y-8">
      {/* Icon added to enhance the visual appeal */}
      <div className="flex items-center space-x-4">
        <FaRoad className="text-primary text-6xl" />
        <h1 className="text-4xl font-bold text-primary text-center">
          Sistema de Seguimiento y Reparación de Baches
        </h1>
      </div>
      
      {/* Links with improved design */}
      <div className="space-x-4">
        <Link
          to="/informador"
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
        >
          Informador
        </Link>
        <Link
          to="/admin"
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
        >
          Administrador
        </Link>
      </div>
    </div>
  );
};

export default Home;

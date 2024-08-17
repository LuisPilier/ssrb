import React from 'react';
import { Link } from 'react-router-dom';
import { FaRoad } from 'react-icons/fa'; // Correctly importing the FaRoad icon

const Home = () => {
  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center px-4 py-8 space-y-12">
      {/* Icon added to enhance the visual appeal */}
      <div className="flex items-center space-x-4">
        <FaRoad className="text-primary text-6xl" />
        <h1 className="text-4xl font-bold text-primary text-center">
          Sistema de Seguimiento y Reparación de Baches
        </h1>
      </div>
      
      {/* Container for the button and existing links */}
      <div className="flex flex-col items-center space-y-6">
        {/* Centered button */}
        <Link
          to="/comparativa"
          className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white py-4 px-8 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Prog. Paralela vs Prog. Distribuida
        </Link>

        {/* Existing links with improved design */}
        <div className="flex space-x-4">
          <Link
            to="/informador"
            className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Informador
          </Link>
          <Link
            to="/admin"
            className="bg-green-600 text-white py-3 px-6 rounded-full text-lg font-medium shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Administrador
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

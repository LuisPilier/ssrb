import React from 'react';
import BacheForm from '../components/BacheForm';

const Informador = () => {
  const handleAddBache = async (newBache) => {
    // Aquí el nuevo bache se guarda directamente en Supabase
  };

  return (
    <div className="min-h-screen bg-light p-8 flex flex-col items-center">
      <h2 className="text-2xl font-poppins text-primary mb-6">Reportar un Nuevo Bache</h2>
      <BacheForm onSubmit={handleAddBache} />
    </div>
  );
};

export default Informador;

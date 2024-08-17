import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import Swal from 'sweetalert2';

const BacheList = () => {
  const [baches, setBaches] = useState([]);
  const [selectedBache, setSelectedBache] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tamaño: '',
    posición: '',
    prioridad: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [bachesPerPage] = useState(10);

  useEffect(() => {
    const fetchBaches = async () => {
      const { data, error } = await supabase
        .from('baches')
        .select('*');

      if (error) {
        console.error('Error fetching baches:', error);
      } else {
        setBaches(data);
      }
    };

    fetchBaches();
  }, []);

  const handleUpdate = (bache) => {
    setSelectedBache(bache);
    setFormData({
      tamaño: bache.tamaño,
      posición: bache.posición,
      prioridad: bache.prioridad
    });
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (bache) => {
    setSelectedBache(bache);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedBache(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateBache = async () => {
    try {
      console.log('Datos del formulario:', formData);
      
      const { error } = await supabase
        .from('baches')
        .update({
          tamaño: formData.tamaño,
          posición: formData.posición,
          prioridad: formData.prioridad
        })
        .eq('id', selectedBache.id);

      if (error) {
        throw new Error(error.message);
      } else {
        setBaches(
          baches.map((bache) =>
            bache.id === selectedBache.id
              ? { ...bache, tamaño: formData.tamaño, posición: formData.posición, prioridad: formData.prioridad }
              : bache
          )
        );
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Bache actualizado correctamente!',
        });
        closeModals();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar el bache: ' + err.message,
      });
    }
  };

  const deleteBache = async () => {
    try {
      const { error } = await supabase
        .from('baches')
        .delete()
        .eq('id', selectedBache.id);

      if (error) {
        throw new Error(error.message);
      } else {
        setBaches(baches.filter((bache) => bache.id !== selectedBache.id));
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Bache eliminado correctamente!',
        });
        closeModals();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al eliminar el bache: ' + err.message,
      });
    }
  };

  // Get current baches
  const indexOfLastBache = currentPage * bachesPerPage;
  const indexOfFirstBache = indexOfLastBache - bachesPerPage;
  const currentBaches = baches.slice(indexOfFirstBache, indexOfLastBache);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md font-poppins">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Lista de Baches</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Número Referencia</th>
              <th className="py-3 px-6 text-left">Calle</th>
              <th className="py-3 px-6 text-left">Tamaño</th>
              <th className="py-3 px-6 text-left">Posición</th>
              <th className="py-3 px-6 text-left">Distrito</th>
              <th className="py-3 px-6 text-left">Prioridad</th>
              
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {currentBaches.map((bache) => (
              <tr key={bache.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{bache.id}</td>
                <td className="py-3 px-6 text-left">{bache.calle}</td>
                <td className="py-3 px-6 text-left">{bache.tamaño}</td>
                <td className="py-3 px-6 text-left">{bache.posición}</td>
                <td className="py-3 px-6 text-left">{bache.distrito}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`text-xs font-semibold inline-block py-1 px-2 rounded text-white ${
                        bache.prioridad <= 4
                        ? 'bg-red-500'
                        : bache.prioridad <= 7
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  >
                    {bache.prioridad}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(baches.length / bachesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Actualizar Bache</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Calle</label>
                <input
                  type="text"
                  name="calle"
                  value={selectedBache.calle}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Distrito</label>
                <input
                  type="text"
                  name="distrito"
                  value={selectedBache.distrito}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Tamaño</label>
                <input
                  type="text"
                  name="tamaño"
                  value={formData.tamaño}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Posición</label>
                <input
                  type="text"
                  name="posición"
                  value={formData.posición}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Prioridad</label>
                <input
                  type="number"
                  name="prioridad"
                  value={formData.prioridad}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={updateBache}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Actualizar
              </button>
              <button
                onClick={closeModals}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Eliminar Bache</h3>
            <p>¿Estás seguro de que deseas eliminar el bache con ID {selectedBache.id}?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={deleteBache}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Eliminar
              </button>
              <button
                onClick={closeModals}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BacheList;
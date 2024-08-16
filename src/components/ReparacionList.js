import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Swal from "sweetalert2";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const ReparacionList = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [selectedReparacion, setSelectedReparacion] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    bache_id: "",
    brigada: "",
    trabajadores: "",
    equipamiento: "",
    horas_empleadas: "",
    estado: "",
    material_relleno: "",
    coste: "",
  });

  useEffect(() => {
    const fetchReparaciones = async () => {
      const { data, error } = await supabase.from("reparaciones").select("*");
      if (error) {
        console.error("Error fetching reparaciones:", error);
      } else {
        setReparaciones(data);
      }
    };

    fetchReparaciones();

    // Suscribirse a cambios en la tabla 'reparaciones'

    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reparaciones" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleUpdate = (reparacion) => {
    setSelectedReparacion(reparacion);
    setFormData({
      bache_id: reparacion.bache_id,
      brigada: reparacion.brigada,
      trabajadores: reparacion.trabajadores,
      equipamiento: reparacion.equipamiento,
      horas_empleadas: reparacion.horas_empleadas,
      estado: reparacion.estado,
      material_relleno: reparacion.material_relleno,
      coste: reparacion.coste,
    });
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (reparacion) => {
    setSelectedReparacion(reparacion);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedReparacion(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateReparacion = async () => {
    try {
      // Asegúrate de que `formData.coste` sea una cadena antes de llamar a `replace`
      const costeString = String(formData.coste || "");

      // Convierte el coste a número decimal, manejando comas si las hay
      const costeNumerico = parseFloat(costeString.replace(/,/g, ""));

      // Verifica si el valor convertido es un número válido
      if (isNaN(costeNumerico)) {
        throw new Error("El coste no es un número válido");
      }

      // Ejecuta la actualización
      const { data, error } = await supabase
        .from("reparaciones")
        .update({
          bache_id: parseInt(formData.bache_id, 10),
          brigada: formData.brigada,
          trabajadores: parseInt(formData.trabajadores, 10),
          equipamiento: formData.equipamiento,
          horas_empleadas: parseInt(formData.horas_empleadas, 10),
          estado: formData.estado,
          material_relleno: formData.material_relleno,
          coste: costeNumerico, // Envía el valor numérico para el campo NUMERIC
        })
        .eq("id", selectedReparacion.id)
        .select(); // Asegúrate de usar select() si deseas obtener datos de la actualización

      if (error) throw new Error(error.message);

      // Actualiza el estado con los datos recuperados
      setReparaciones(
        reparaciones.map((reparacion) =>
          reparacion.id === selectedReparacion.id
            ? { ...reparacion, ...data[0] } // Actualiza con los nuevos datos
            : reparacion
        )
      );

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Reparación actualizada correctamente!",
      });

      closeModals();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar la reparación: " + err.message,
      });
    }
  };

  const deleteReparacion = async () => {
    try {
      const { error } = await supabase
        .from("reparaciones")
        .delete()
        .eq("id", selectedReparacion.id);

      if (error) throw new Error(error.message);
      setReparaciones(
        reparaciones.filter(
          (reparacion) => reparacion.id !== selectedReparacion.id
        )
      );
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Reparación eliminada correctamente!",
      });
      closeModals();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar la reparación: " + err.message,
      });
    }
  };

  return (
    <div className="p-6 bg-[#F7F9FC] rounded-lg shadow-lg font-poppins">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Lista de Reparaciones
      </h2>
      {reparaciones.length === 0 ? (
        <p className="text-gray-600">No hay reparaciones disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reparaciones.map((reparacion) => (
            <div
              key={reparacion.id}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-5 transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Número de Bache: {reparacion.bache_id}
              </h3>
              <p>
                <strong>Brigada:</strong> {reparacion.brigada}
              </p>
              <p>
                <strong>Trabajadores:</strong> {reparacion.trabajadores}
              </p>
              <p>
                <strong>Equipamiento:</strong> {reparacion.equipamiento}
              </p>
              <p>
                <strong>Horas Empleadas:</strong> {reparacion.horas_empleadas}
              </p>
              <p>
                <strong>Estado:</strong>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-semibold rounded text-white ${
                    reparacion.estado === "Obra en curso"
                      ? "bg-yellow-500"
                      : reparacion.estado === "Reparación temporal"
                      ? "bg-orange-500"
                      : reparacion.estado === "No reparado"
                      ? "bg-red-500"
                      : reparacion.estado === "Reparado"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {reparacion.estado}
                </span>
              </p>
              <p>
                <strong>Material Relleno:</strong> {reparacion.material_relleno}
              </p>
              <p>
                <strong>Coste:</strong> {formatNumber(reparacion.coste)}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleUpdate(reparacion)}
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-blue-600 transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(reparacion)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-red-600 transition duration-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
            <h3 className="text-xl font-semibold mb-4">
              Actualizar Reparación
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateReparacion();
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="bache_id"
                >
                  Número de Bache
                </label>
                <input
                  type="text"
                  name="bache_id"
                  value={formData.bache_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="brigada"
                >
                  Brigada
                </label>
                <input
                  type="text"
                  name="brigada"
                  value={formData.brigada}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="trabajadores"
                >
                  Trabajadores
                </label>
                <input
                  type="number"
                  name="trabajadores"
                  value={formData.trabajadores}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="equipamiento"
                >
                  Equipamiento
                </label>
                <input
                  type="text"
                  name="equipamiento"
                  value={formData.equipamiento}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="horas_empleadas"
                >
                  Horas Empleadas
                </label>
                <input
                  type="number"
                  name="horas_empleadas"
                  value={formData.horas_empleadas}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="estado"
                >
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Seleccionar estado</option>
                  <option value="Obra en curso">Obra en curso</option>
                  <option value="Reparado">Reparado</option>
                  <option value="Reparación temporal">
                    Reparación temporal
                  </option>
                  <option value="No reparado">No reparado</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="material_relleno"
                >
                  Material de Relleno
                </label>
                <input
                  type="text"
                  name="material_relleno"
                  value={formData.material_relleno}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="coste"
                >
                  Coste
                </label>
                <input
                  type="text"
                  name="coste"
                  value={formData.coste}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="col-span-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModals}
                  className="bg-gray-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-gray-600 transition duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-blue-600 transition duration-200"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">Eliminar Reparación</h3>
            <p>¿Estás seguro de que deseas eliminar esta reparación?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModals}
                className="bg-gray-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-gray-600 transition duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={deleteReparacion}
                className="bg-red-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-red-600 transition duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReparacionList;

// src/components/ReparacionForm.js

import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import Swal from "sweetalert2";

const ReparacionForm = () => {
  const [baches, setBaches] = useState([]);
  const [bacheId, setBacheId] = useState("");
  const [brigada, setBrigada] = useState("");
  const [trabajadores, setTrabajadores] = useState("");
  const [equipamiento, setEquipamiento] = useState("");
  const [horas, setHoras] = useState("");
  const [estado, setEstado] = useState("");
  const [material, setMaterial] = useState("");
  const [coste, setCoste] = useState("");

  useEffect(() => {
    const fetchBaches = async () => {
      const { data, error } = await supabase.from("baches").select("*");

      if (error) {
        console.error("Error fetching baches:", error);
      } else {
        setBaches(data);
      }
    };

    fetchBaches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("reparaciones")
      .insert([
        {
          bache_id: parseInt(bacheId, 10),
          brigada,
          trabajadores: parseInt(trabajadores, 10),
          equipamiento,
          horas_empleadas: parseInt(horas, 10),
          estado,
          material_relleno: material,
          coste: parseFloat(coste),
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting reparacion:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar la reparación. Inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "La reparación se ha registrado correctamente.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        setBacheId("");
        setBrigada("");
        setTrabajadores("");
        setEquipamiento("");
        setHoras("");
        setEstado("");
        setMaterial("");
        setCoste("");
        window.location.reload();
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded shadow-lg"
    >
      <div className="col-span-1">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Seleccionar Bache
        </label>
        <select
          value={bacheId}
          onChange={(e) => setBacheId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          required
        >
          <option value="">Seleccionar...</option>
          {baches.map((bache) => (
            <option key={bache.id} value={bache.id}>
              {bache.calle} - {bache.posición}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Brigada
        </label>
        <input
          type="text"
          value={brigada}
          onChange={(e) => setBrigada(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Número de Trabajadores
        </label>
        <input
          type="number"
          value={trabajadores}
          onChange={(e) => setTrabajadores(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Equipamiento
        </label>
        <input
          type="text"
          value={equipamiento}
          onChange={(e) => setEquipamiento(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Horas de Reparación
        </label>
        <input
          type="number"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Estado
        </label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          required
        >
          <option value="">Seleccionar estado</option>
          <option value="Obra en curso">Obra en curso</option>
          <option value="Reparado">Reparado</option>
          <option value="Reparación temporal">Reparación temporal</option>
          <option value="No reparado">No reparado</option>
        </select>
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Material Usado
        </label>
        <input
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Coste
        </label>
        <input
          type="number"
          step="0.01"
          value={coste}
          onChange={(e) => setCoste(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          required
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Registrar Reparación
        </button>
      </div>
    </form>
  );
};

export default ReparacionForm;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import versusImage from '../assets/versus_9276248.png'; // Asegúrate de que la ruta sea correcta

// Paleta de Colores
const colors = {
  primary: '#6482AD',
  secondary: '#7FA1C3',
  accent: '#E2DAD6',
  background: '#F5EDED',
};

function Comparativa() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirige a la página principal
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-7 bg-background">
      {/* Botón Volver al Home */}
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 p-2 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition-colors"
      >
        Volver al Home
      </button>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-8xl">
        
        {/* Columna Paralela */}
        <div className="p-8 border border-gray-300 rounded-lg shadow-md bg-white col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-primary">Programación Paralela</h2>
          <p className="text-gray-700 mb-6">
            La programación paralela es una técnica de desarrollo en la cual múltiples operaciones o procesos se ejecutan simultáneamente, aprovechando la capacidad de procesamiento de múltiples núcleos de CPU o GPU dentro de una única máquina. El objetivo es dividir una tarea grande en subtareas más pequeñas que se pueden ejecutar en paralelo, mejorando la velocidad y eficiencia del procesamiento.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-secondary">Pros:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li><strong>Velocidad de Ejecución:</strong> La ejecución simultánea de múltiples tareas permite acelerar el procesamiento de grandes volúmenes de datos, lo cual es beneficioso para sistemas como el SSRB que necesitan procesar y responder a múltiples reportes de baches en tiempo real.</li>
            <li><strong>Aprovechamiento Completo del Hardware:</strong> La programación paralela maximiza el uso de los recursos de hardware disponibles, como los múltiples núcleos de una CPU o GPU, lo que optimiza el rendimiento del sistema.</li>
            <li><strong>Reducción de Tiempos de Respuesta:</strong> Al dividir una tarea en subtareas paralelas, los tiempos de respuesta pueden reducirse significativamente, lo que es crucial para aplicaciones que requieren procesamiento rápido y eficiente, como el seguimiento y reparación de baches.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 text-secondary">Contras:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li><strong>Complejidad de Desarrollo:</strong> La creación de software paralelo es más compleja debido a la necesidad de manejar concurrencia, sincronización y evitar condiciones de carrera, lo que puede aumentar el tiempo y el costo de desarrollo del SSRB.</li>
            <li><strong>Problemas de Sincronización:</strong> La correcta sincronización entre los procesos paralelos es crítica y puede ser difícil de lograr, lo que podría llevar a inconsistencias en los datos o a bloqueos del sistema.</li>
            <li><strong>Dificultad en la Depuración:</strong> La depuración de programas paralelos es más complicada que la de programas secuenciales debido a la simultaneidad de procesos, lo que puede dificultar la identificación y resolución de errores.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 text-secondary">Casos de Uso en SSRB:</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li><strong>Procesamiento de Reportes Simultáneos:</strong> La programación paralela permite que el SSRB procese múltiples reportes de baches al mismo tiempo, asignando diferentes hilos de ejecución para cada reporte, lo que agiliza la respuesta y gestión de los mismos.</li>
            <li><strong>Cálculo de Prioridades de Reparación:</strong> Se pueden utilizar algoritmos paralelos para calcular las prioridades de reparación de los baches reportados, basados en el tamaño y la ubicación, de manera más rápida y eficiente.</li>
          </ul>
        </div>

        {/* Imagen Versus */}
        <div className="flex items-center justify-center col-span-1">
          <img src={versusImage} alt="Versus" className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover" />
        </div>

        {/* Columna Distribuida */}
        <div className="p-8 border border-gray-300 rounded-lg shadow-md bg-white col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-primary">Programación Distribuida</h2>
          <p className="text-gray-700 mb-6">
            La programación distribuida involucra la ejecución de procesos en múltiples nodos o máquinas dentro de una red, donde cada nodo puede realizar una parte de la tarea global. Este enfoque es ideal para aplicaciones que requieren escalabilidad, alta disponibilidad, y procesamiento en diferentes ubicaciones geográficas.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-secondary">Pros:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li><strong>Escalabilidad Horizontal:</strong> Los sistemas distribuidos pueden escalar fácilmente al agregar más nodos a la red, lo que permite manejar una mayor carga de trabajo, ideal para SSRB si la cantidad de reportes de baches aumenta considerablemente.</li>
            <li><strong>Tolerancia a Fallos:</strong> Si un nodo falla, otros nodos en el sistema distribuido pueden continuar operando, mejorando la resiliencia y disponibilidad del SSRB.</li>
            <li><strong>Distribución Geográfica:</strong> Permite que diferentes partes del sistema estén ubicadas en diferentes regiones, lo que es útil para aplicaciones como SSRB que gestionan datos y operaciones en diversas áreas geográficas.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 text-secondary">Contras:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li><strong>Sobrecarga de Comunicación:</strong> La comunicación entre nodos distribuidos puede generar una sobrecarga, especialmente si los nodos están dispersos geográficamente, lo que podría afectar el rendimiento del SSRB.</li>
            <li><strong>Consistencia de Datos:</strong> Mantener la consistencia de los datos en un entorno distribuido puede ser un desafío, especialmente cuando los datos son actualizados simultáneamente en diferentes nodos, lo que podría causar inconsistencias en la información del SSRB.</li>
            <li><strong>Costos de Infraestructura:</strong> Implementar y mantener un sistema distribuido puede ser más costoso debido a la necesidad de servidores adicionales, redes robustas, y herramientas de gestión especializadas.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 text-secondary">Casos de Uso en SSRB:</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li><strong>Gestión Descentralizada de Reportes:</strong> La programación distribuida permite que el SSRB gestione reportes de baches desde diferentes distritos de la ciudad en nodos separados, mejorando la eficiencia y rapidez en la respuesta.</li>
            <li><strong>Asignación de Brigadas de Reparación:</strong> Las tareas de asignación y seguimiento de brigadas de reparación pueden ser distribuidas entre nodos que manejan diferentes áreas geográficas, optimizando el uso de recursos y mejorando la gestión operativa del SSRB.</li>
            <li><strong>Monitoreo y Análisis en Tiempo Real:</strong> Un sistema distribuido facilita el monitoreo y análisis en tiempo real de los datos reportados, permitiendo a las autoridades tomar decisiones rápidas y efectivas.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comparativa;

import React from 'react';

const NosotrosAs = () => {
  const valores = [
    "Orientación al cliente",
    "Honestidad",
    "Trabajo en equipo",
    "Optimismo",
    "Compromiso con el Medio Ambiente",
    "Proactividad",
    "Respeto",
    "Transparencia"
  ];

  return (
    <div className="bg-gray-100 py-16" id="nosotrosAs">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-customGreen mb-12">NOSOTROS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-customGreen mb-4">NUESTRA VISIÓN</h3>
            <p className="text-gray-700">
              Estar junto a quien produce, buscando soluciones desde el inicio hasta el final de cada cultivo, satisfaciendo a nuestros clientes, colaboradores y accionistas.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-customGreen mb-4">NUESTRA MISIÓN</h3>
            <p className="text-gray-700">
              Ser la empresa que ofrece la mejor atención al cliente con la mayor diversidad de servicios que requiere el sector de producción agrícola del Paraguay, promoviendo la mejora continua de su sistema de gestión.
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-customGreen mb-6 text-center">NUESTROS VALORES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {valores.map((valor, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="text-gray-700">{valor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NosotrosAs;
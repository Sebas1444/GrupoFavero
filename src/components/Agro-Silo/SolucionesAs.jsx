import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAs from './HeaderAs';

export default function SolucionesAs() {
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      navigate('/'); 
      setTimeout(() => {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderAs onNavClick={handleNavClick} />
      <main className="flex-grow bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-12">Soluciones</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Productos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">PRODUCTOS</h2>
            <div className="space-y-4">
              <div>
                <img src="/img/agroquimicos.png" alt="Agroquímicos y Fertilizantes" className="w-full h-40 object-cover rounded-md mb-2" />
                <button 
                  onClick={() => handleExternalLink('http://www.aktra.com.py/web/es')}
                  className="w-full bg-customGreen text-white py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  AGROQUÍMICOS, FERTILIZANTES
                </button>
              </div>
              <div>
                <img src="/img/semillas.png" alt="Semillas" className="w-full h-40 object-cover rounded-md mb-2" />
                <button 
                  onClick={() => handleExternalLink('https://semillasveronica.com.py')}
                  className="w-full bg-customGreen text-white py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  SEMILLAS
                </button>
              </div>
            </div>
          </div>

          {/* Maquinarias */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">MAQUINARIAS</h2>
            <img src="/img/t5070.jpg" alt="Maquinarias" className="w-full h-64 object-cover rounded-md" />
            <p className="mt-4 text-gray-600">
              Todas las soluciones en maquinaria agrícola para optimizar tu producción.
            </p>
          </div>

          {/* Granos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">SERVICIOS</h2>
            <div className="space-y-4">
              <div>
                <img src="/img/pindo.jpg" alt="              Nuestros servicios para el almacenamiento y procesamiento de granos." className="w-full h-40 object-cover rounded-md mb-2" />
                <button 
                  // onClick={() => handleExternalLink('https://aktra.com.py')}
                  className="w-full bg-customGreen text-white py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  ACOPIO
                </button>
              </div>
              <div>
                <img src="/img/silo.jpg" alt="Semillas" className="w-full h-40 object-cover rounded-md mb-2" />
                <button 
                  // onClick={() => handleExternalLink('https://semillasveronica.com.py')}
                  className="w-full bg-customGreen text-white py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  PROCESAMIENTO DE GRANOS
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
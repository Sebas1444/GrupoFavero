import React, { useState, useEffect } from 'react';

const backgroundImages = [
  { src: '/img/campo1.jpg', alt: 'Campo de trigo' },
  { src: '/img/campo2.jpg', alt: 'Silo 1' },
  { src: '/img/edificio.png', alt: 'Silo 3' },
];

const LaEmpresaGc = ({ onNavClick, quienesSomosGcRef }) => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const nextBackground = () => {
    setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextBackground, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[700px]" id="quienes-somosGc">
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((image, index) => (
          <div 
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentBackgroundIndex ? 1 : 0,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white bg-customGreen bg-opacity-80 p-6 rounded-lg">
              <h1 ref={quienesSomosGcRef}  className="text-4xl md:text-5xl font-bold mb-6">QUIÉNES SOMOS</h1>
              <p className="text-lg mb-4">
                <span className="font-bold">Agro Silo Santa Catalina S.A.</span> es la empresa pionera del Grupo Favero, dedicada principalmente a la producción, acopio y comercialización de productos agrícolas, especialmente la soja, así como también maíz, trigo, canola y girasol, a través de los 13 silos que se encuentran distribuidos estratégicamente en la Región Oriental, con infraestructura de recepción de granos, básculas, control de calidad y secaderos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaEmpresaGc;
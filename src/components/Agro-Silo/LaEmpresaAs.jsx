import React, { useState, useEffect } from 'react';


const backgroundImages = [
  { src: '/img/campo1.jpg', alt: 'Campo de trigo' },
  { src: '/img/campo2.jpg', alt: 'Silo 1' },
  // { src: '/img/campo3.jpg', alt: 'Silo 2' },
  { src: '/img/edificio.png', alt: 'Silo 3' },
];

const LaEmpresaAs = ({ onNavClick, quienesSomosAsRef }) => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const nextBackground = () => {
    setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextBackground, 5000); // Avance automático cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">

      
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((image, index) => (
          <div 
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentBackgroundIndex ? 1 : 0,
            }}
          >
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-[1600px] h-[680px] relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white bg-customGreen bg-opacity-80 p-6 rounded-lg">
              <h1 ref={quienesSomosAsRef} id="quienes-somosAs" className="text-4xl md:text-5xl font-bold mb-6">NOSOTROS</h1>
              <p className="text-lg mb-4">
                <span className="font-bold">Agro Silo Santa Catalina S.A.</span> es la empresa pionera del Grupo Favero, dedicada principalmente a la producción, acopio y comercialización de productos agrícolas, especialmente la soja, así como también maíz, trigo, canola y girasol, a través de los 13 silos que se encuentran distribuidos estratégicamente en la Región Oriental, con infraestructura de recepción de granos, básculas, control de calidad y secaderos.
              </p>
              <p className="text-lg mb-4">
                <span className="font-bold"></span>  Cuenta con un plantel de Ingenieros Agrónomos altamente capacitados, con gran experiencia, que acompañan tanto a la empresa como a los productores independientes, desde la preparación de sus terrenos hasta la cosecha.
              </p>
              <p className="text-lg mb-4">
                <span className="font-bold"></span> Las operaciones de la empresa representaron en el Ranking de Impuestos (2014) la posición N° 10, como una de las mejores empresas aportantes al fisco con Gs. 82.765.751.988, el criterio utilizado por el fisco incluye todos los pagos efectuados a la SET y las retenciones que le fueron practicadas. Lo que confirma también el compromiso de esta firma con el desarrollo económico del país.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LaEmpresaAs;
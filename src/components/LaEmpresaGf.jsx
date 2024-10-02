import React from 'react';

const LaEmpresa = React.forwardRef(({ quienesSomosRef }, ref) => {
  return (
    <div ref={ref} className="bg-gradient-to-b from-customBlue to-customBlue py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 ref={quienesSomosRef} id="quienes-somos" className="text-4xl md:text-5xl font-bold mb-6">NOSOTROS</h1>
            <p className="text-lg mb-4">
              El <span className="font-bold">Grupo Favero</span> es un conjunto de empresas que trabajan en el desarrollo de la agricultura, agroindustrias y la ganadería en el Paraguay desde hace cuatro décadas, constituyéndose en la actualidad en uno de los grupos económicos más importantes del sector agropecuario del país.
            </p>
            <p className="text-lg mb-4">
              <span className="font-bold">Nuestra Misión Corporativa</span> es satisfacer las necesidades del cliente interno y externo: desarrollando, fabricando y comercializando productos y servicios de excelente calidad.
            </p>
          </div>
          <div className="relative group">
            <img
              src='/img/edificio.png'
              alt="Edificio Grupo Favero"
              className="rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105 w-full h-auto"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-customBlue opacity-10 rounded-lg transition-opacity duration-300 group-hover:opacity-0"></div>
            <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xl font-bold bg-black bg-opacity-50 w-full text-center py-2 rounded-b-lg">Edificio Corporativo - Luque</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LaEmpresa;
import React, { useState, useEffect } from "react";
import { Book, Leaf, Users, ChevronLeft, ChevronRight, X } from 'lucide-react';

const focosRSE = [
  {
    titulo: "EDUCACIÓN",
    descripcion: "Iniciativas que inciden en el desarrollo de habilidades y competencias que ayuden a romper con el círculo de la pobreza.",
    icono: Book,
    color: "bg-blue-100 text-customBlue"
  },
  {
    titulo: "GESTIÓN AMBIENTAL",
    descripcion: "Priorizamos los emprendimientos vinculados a la gestión responsable de los residuos generados por nuestras actividades productivas, el uso sostenible de los recursos naturales, el abastecimiento energético de fuentes renovables, y el manejo responsable de los productos fitosanitarios en la producción.",
    icono: Leaf,
    color: "bg-green-100 text-customBlue"
  },
  {
    titulo: "CALIDAD DE VIDA",
    descripcion: "Emprendimientos que aportan al acceso a oportunidades de desarrollo socioeconómico; en particular aquellos que permitan la generación de ingresos y de conocimiento sobre derechos humanos.",
    icono: Users,
    color: "bg-yellow-100 text-customBlue"
  }
];

const accionesRSE = [
  {
    titulo: "Programa de Educación Ambiental",
    descripcion: "Talleres y actividades para concientizar sobre el cuidado del medio ambiente.",
    descripcionDetallada: "Nuestro Programa de Educación Ambiental ofrece una serie de talleres interactivos y actividades prácticas diseñadas para educar a la comunidad sobre la importancia de la conservación del medio ambiente. Los participantes aprenden sobre reciclaje, conservación de energía, y prácticas sostenibles que pueden implementar en su vida diaria.",
    imagen: "/img/rse/rse6.jpeg",
    posicionImagen: { x: 50, y: 50 }
  },
  {
    titulo: "Proyecto de Reforestación",
    descripcion: "Iniciativa para plantar árboles nativos en áreas deforestadas.",
    descripcionDetallada: "El Proyecto de Reforestación es una iniciativa a largo plazo que busca restaurar ecosistemas degradados mediante la plantación de especies de árboles nativos. Trabajamos en colaboración con comunidades locales y expertos en silvicultura para seleccionar las especies más adecuadas y asegurar el cuidado continuo de las áreas reforestadas.",
    imagen: "/img/rse/rse5.jpg",
    posicionImagen: { x: 50, y: 50 }
  },
  {
    titulo: "Programa de Capacitación Laboral",
    descripcion: "Cursos de formación profesional para jóvenes de comunidades vulnerables.",
    descripcionDetallada: "Nuestro Programa de Capacitación Laboral ofrece cursos gratuitos de formación profesional en diversas áreas como tecnología, oficios y habilidades empresariales. El programa está dirigido a jóvenes de comunidades vulnerables, con el objetivo de mejorar sus oportunidades de empleo y fomentar el desarrollo económico local.",
    imagen: "/img/rse/rse5.jpg",
    posicionImagen: { x: 50, y: 50 }
  }
];

export default function RseGf() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAccion, setSelectedAccion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % focosRSE.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(accionesRSE.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(accionesRSE.length / 3)) % Math.ceil(accionesRSE.length / 3));
  };

  const openModal = (accion) => {
    setSelectedAccion(accion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAccion(null);
    setIsModalOpen(false);
  };

  return (
    <section id="rse" className="bg-gradient-to-br from-gray-100 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-customBlue mb-8 text-center">RESPONSABILIDAD SOCIAL EMPRESARIAL</h2>
        
        <div className="mb-12 text-gray-700 max-w-3xl mx-auto">
          <p className="mb-4 text-lg">
            En el Grupo Favero entendemos que las empresas tienen un potencial muy importante en el desarrollo sustentable de la sociedad, que trasciende la creación de valor económico, impactando también en el social y ambiental.
          </p>
          <p className="text-lg">
            Es por ello que, a través de nuestra <span className="font-semibold text-customBlue">Política de Responsabilidad Social</span>, nos comprometemos a apoyar proactivamente el progreso y bienestar de nuestros grupos de interés, propiciando iniciativas concretas que nos lleven a implementar las mejores prácticas sociales y ambientales en nuestras operaciones.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-customBlue mb-8 text-center">NUESTROS FOCOS TEMÁTICOS</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {focosRSE.map((foco, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === index
                    ? 'bg-customBlue text-white shadow-lg scale-105'
                    : 'bg-white text-customBlue hover:bg-blue-50'
                }`}
              >
                {foco.titulo}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-start mb-4">
              <div className={`p-3 rounded-full ${focosRSE[activeTab].color} mr-4`}>
                {React.createElement(focosRSE[activeTab].icono, { className: "w-6 h-6" })}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-customBlue mb-2">{focosRSE[activeTab].titulo}</h4>
                <div className="min-h-20">
                  <p className="text-gray-700 leading-relaxed">{focosRSE[activeTab].descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-customBlue mb-8 text-center">NUESTRAS ACCIONES</h3>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {Array.from({ length: Math.ceil(accionesRSE.length / 3) }).map((_, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {accionesRSE.slice(index * 3, (index + 1) * 3).map((accion, accionIndex) => (
                        <div key={accionIndex} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer group" onClick={() => openModal(accion)}>
                          <div className="relative h-48 sm:h-64 md:h-48 lg:h-64 overflow-hidden">
                            <img 
                              src={accion.imagen} 
                              alt={accion.titulo} 
                              className="absolute w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                              style={{ 
                                objectPosition: `${accion.posicionImagen.x}% ${accion.posicionImagen.y}%`
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                          </div>
                          <div className="p-4">
                            <h5 className="text-lg font-semibold text-customBlue mb-2">{accion.titulo}</h5>
                            <p className="text-gray-600">{accion.descripcion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {accionesRSE.length > 3 && (
              <>
                <button 
                  onClick={prevSlide} 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-customBlue" />
                </button>
                <button 
                  onClick={nextSlide} 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-6 h-6 text-customBlue" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedAccion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-customBlue">{selectedAccion.titulo}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative w-full h-64 mb-4">
              <img 
                src={selectedAccion.imagen} 
                alt={selectedAccion.titulo} 
                className="absolute w-full h-full object-cover rounded"
                style={{ 
                  objectPosition: `${selectedAccion.posicionImagen.x}% ${selectedAccion.posicionImagen.y}%`
                }}
              />
            </div>
            <p className="text-gray-700 mb-4">{selectedAccion.descripcion}</p>
            <h4 className="text-xl font-semibold text-customBlue mb-2">Descripción Detallada</h4>
            <p className="text-gray-700">{selectedAccion.descripcionDetallada}</p>
          </div>
        </div>
      )}
    </section>
  );
}
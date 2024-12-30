import React, { useState, useEffect } from "react";
import { Book, Leaf, Users, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Datos de los focos temáticos
const focosRSE = [
  {
    titulo: "EDUCACIÓN",
    descripcion: "Iniciativas que inciden en el desarrollo de habilidades y competencias...",
    icono: Book, // Icono que representa el foco temático
    color: "bg-blue-100 text-customBlue" // Colores de fondo y texto para estilizar el icono
  },
  {
    titulo: "GESTIÓN AMBIENTAL",
    descripcion: "Priorizamos los emprendimientos vinculados a la gestión responsable de los residuos...",
    icono: Leaf,
    color: "bg-green-100 text-customBlue"
  },
  {
    titulo: "CALIDAD DE VIDA",
    descripcion: "Emprendimientos que aportan al acceso a oportunidades de desarrollo socioeconómico...",
    icono: Users,
    color: "bg-yellow-100 text-customBlue"
  }
];

// Datos de las acciones de RSE
const accionesRSE = [
  {
    titulo: "Programa de Educación Ambiental",
    descripcion: "Talleres y actividades para concientizar sobre el cuidado del medio ambiente.",
    descripcionDetallada: "Nuestro Programa de Educación Ambiental ofrece una serie de talleres interactivos...",
    imagen: "/img/rse/rse6.jpeg", // Ruta de la imagen representativa
    posicionImagen: { x: 50, y: 50 } // Posición personalizada de la imagen
  },
  {
    titulo: "Proyecto de Reforestación",
    descripcion: "Iniciativa para plantar árboles nativos en áreas deforestadas.",
    descripcionDetallada: "El Proyecto de Reforestación es una iniciativa a largo plazo...",
    imagen: "/img/rse/rse5.jpg",
    posicionImagen: { x: 50, y: 50 }
  },
  {
    titulo: "Programa de Capacitación Laboral",
    descripcion: "Cursos de formación profesional para jóvenes de comunidades vulnerables.",
    descripcionDetallada: "Nuestro Programa de Capacitación Laboral ofrece cursos gratuitos de formación...",
    imagen: "/img/rse/rse5.jpg",
    posicionImagen: { x: 50, y: 50 }
  }
];

export default function RseGf() {
  // Estado para la pestaña activa en los focos temáticos
  const [activeTab, setActiveTab] = useState(0);
  // Estado para la página actual del carrusel de acciones
  const [currentSlide, setCurrentSlide] = useState(0);
  // Estado para manejar la acción seleccionada y el modal
  const [selectedAccion, setSelectedAccion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cambia automáticamente la pestaña activa cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % focosRSE.length);
    }, 10000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  // Avanza a la siguiente página del carrusel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(accionesRSE.length / 3));
  };

  // Retrocede a la página anterior del carrusel
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(accionesRSE.length / 3)) % Math.ceil(accionesRSE.length / 3));
  };

  // Abre el modal con los detalles de la acción seleccionada
  const openModal = (accion) => {
    setSelectedAccion(accion);
    setIsModalOpen(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setSelectedAccion(null);
    setIsModalOpen(false);
  };

  return (
    <section id="rse" className="bg-gradient-to-br from-gray-100 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <h2 className="text-4xl font-bold text-customBlue mb-8 text-center">
          RESPONSABILIDAD SOCIAL EMPRESARIAL
        </h2>

        {/* Descripción */}
        <div className="mb-12 text-gray-700 max-w-3xl mx-auto">
          <p className="mb-4 text-lg">
            En el Grupo Favero entendemos que las empresas tienen un potencial muy importante...
          </p>
          <p className="text-lg">
            Es por ello que, a través de nuestra <span className="font-semibold text-customBlue">Política...</span>
          </p>
        </div>

        {/* Focos Temáticos */}
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
          {/* Información del foco activo */}
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

        {/* Carrusel y Modal */}
        {/* (Detalles omitidos aquí para simplificar. Ver componente original para el carrusel y modal completos). */}
      </div>
    </section>
  );
}

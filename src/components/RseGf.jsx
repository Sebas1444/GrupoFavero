import React, { useState } from 'react';
import { Book, Leaf, Users, ChevronRight } from 'lucide-react';

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
    titulo: "EQUIPO COMPROMETIDO",
    descripcion: "Capacitar permanentemente a nuestros colaboradores",
    imagen: '/img/rse/rse.jpg',
    posicionImagen: 'center 30%'
  },
  {
    titulo: "INICIATIVAS SUSTENTABLES",
    descripcion: "Desarrollar programas amigables con el Medio Ambiente",
    imagen: '/img/rse/rse6.jpeg',
    posicionImagen: 'center center'
  },
  {
    titulo: "CALIDAD DE VIDA",
    descripcion: "Apoyar y respetar la protección de los derechos humanos, como el derecho a una infancia feliz",
    imagen: '/img/rse/rse4.jpg',
    posicionImagen: 'center 70%'
  }
];

export default function RseGf() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="rse" className="bg-gradient-to-br bg-gray-100 to-white py-16">
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
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-full ${focosRSE[activeTab].color} mr-4`}>
                {React.createElement(focosRSE[activeTab].icono, { className: "w-6 h-6" })}
              </div>
              <h4 className="text-xl font-semibold text-customBlue">{focosRSE[activeTab].titulo}</h4>
            </div>
            <p className="text-gray-700 leading-relaxed">{focosRSE[activeTab].descripcion}</p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-customBlue mb-8 text-center">NUESTRAS ACCIONES</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {accionesRSE.map((accion, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
                <div className="h-48 sm:h-64 md:h-48 lg:h-64 overflow-hidden">
                  <img 
                    src={accion.imagen} 
                    alt={accion.titulo} 
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{ 
                      objectPosition: accion.posicionImagen,
                      transform: index === 0 ? 'scale(1.2) translateY(-10%)' : 'none',
                    }}
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-customBlue mb-2">{accion.titulo}</h5>
                  <p className="text-gray-600">{accion.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
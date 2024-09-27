import React, { useState, forwardRef, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: "QUIÉNES SOMOS", href: "#quienes-somos" },
  { name: "NUESTRAS SUCURSALES", href: "#nuestras-sucursales" },
  { name: "RSE", href: "#rse" },
  { name: "CONTÁCTENOS", href: "#contacto" }
];

const backgroundImages = [
  { src: '/img/campo-trigo.jpg', alt: 'Campo de trigo' },
  { src: '/img/campo-trigo.jpg', alt: 'Silo 1' },
  { src: '/img/campo-trigo.jpg', alt: 'Silo 2' },
  { src: '/img/campo-trigo.jpg', alt: 'Silo 3' },
];

const HeaderAs = forwardRef(({ onNavClick, quienesSomosRef }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    onNavClick(href);
    setIsMenuOpen(false);
  };

  const nextBackground = () => {
    setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  const prevBackground = () => {
    setCurrentBackgroundIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextBackground, 5000); // Avance automático cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="w-full h-[680px] transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentBackgroundIndex * 100}%)`,
            display: 'flex',
            width: `${backgroundImages.length * 100}%`
          }}
        >
          {backgroundImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 flex justify-center items-center">
              <div className="w-[1600px] h-[680px] relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-[1600px] mx-auto">
        <header className="relative">
          <div className="bg-customGreen py-2">
            <div className="container mx-auto px-4">
              <Link to="/" className="text-white hover:text-green-200 transition-colors">
                ← Volver al Grupo Favero
              </Link>
            </div>
          </div>
          <nav className="bg-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center space-x-2">
                  <img src='/img/AgroSilo2.png' alt="Grupo Favero Logo" className="h-12 w-auto" loading="eager" />
                </a>
                
                <div className="hidden md:flex space-x-6">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-customGreen hover:text-green-400 transition-colors font-semibold"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <button
                  className="md:hidden text-customGreen"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </nav>
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50">
              <div className="container mx-auto px-4 py-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-customGreen hover:text-customGreen transition-colors font-semibold"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white bg-customGreen bg-opacity-80 p-6 rounded-lg">
              <h1 ref={quienesSomosRef} id="quienes-somos" className="text-4xl md:text-5xl font-bold mb-6">NOSOTROS</h1>
              <p className="text-lg mb-4">
                <span className="font-bold">Agro Silo Santa Catalina S.A.</span> es la empresa pionera del Grupo Favero, dedicada principalmente a la producción, acopio y comercialización de productos agrícolas, especialmente la soja, así como también maíz, trigo, canola y girasol, a través de los 13 silos que se encuentran distribuidos estratégicamente en la Región Oriental, con infraestructura de recepción de granos, básculas, control de calidad y secaderos.
              </p>
              <p className="text-lg mb-4">
                <span className="font-bold"></span>  Cuenta con un plantel de Ingenieros Agrónomos altamente capacitados, con gran experiencia, que acompañan tanto a la empresa como a los productores independientes, desde la preparación de sus terrenos hasta la cosecha. Las operaciones de la empresa representaron en el Ranking de Impuestos (2014) la posición N° 10, como una de las mejores empresas aportantes al fisco con Gs. 82.765.751.988, el criterio utilizado por el fisco incluye todos los pagos efectuados a la SET y las retenciones que le fueron practicadas. Lo que confirma también el compromiso de esta firma con el desarrollo económico del país.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={prevBackground} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-20"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextBackground} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-20"
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
});

export default HeaderAs;
import React, { useState, forwardRef, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: "QUIÉNES SOMOS", href: "#quienes-somos" },
  { name: "NUESTRAS SUCURSALES", href: "#nuestras-sucursales" },
  { name: "RSE", href: "#rse" },
  { name: "CONTÁCTENOS", href: "#contacto" }
];

const images = [
  { src: '/img/edificio.png', alt: 'Agro Silo Santa Catalina - Cedrales' },
  { src: '/img/edificio.png', alt: 'Silo 1' },
  { src: '/img/edificio.png', alt: 'Silo 2' },
  { src: '/img/edificio.png', alt: 'Silo 3' },
  { src: '/img/campo-trigo.jpg', alt: 'Campo de trigo al atardecer' },
];

const HeaderAs = forwardRef(({ onNavClick, quienesSomosRef }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    onNavClick(href);
    setIsMenuOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 5000); // Avance automático cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={ref} className="bg-gradient-to-b from-customGreen to-customGreen">
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

      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16 h-full flex flex-col justify-center">
          <div className="text-white max-w-3xl">
            <h1 ref={quienesSomosRef} id="quienes-somos" className="text-4xl md:text-5xl font-bold mb-6">NOSOTROS</h1>
            <p className="text-lg mb-4">
              <span className="font-bold">Agro Silo Santa Catalina S.A.</span> es la empresa pionera del Grupo Favero, dedicada principalmente a la producción, acopio y comercialización de productos agrícolas, especialmente la soja, así como también maíz, trigo, canola y girasol, a través de los 13 silos que se encuentran distribuidos estratégicamente en la Región Oriental, con infraestructura de recepción de granos, básculas, control de calidad y secaderos.
            </p>
            <p className="text-lg mb-4">
              Cuenta con un plantel de Ingenieros Agrónomos altamente capacitados, con gran experiencia, que acompañan tanto a la empresa como a los productores independientes, desde la preparación de sus terrenos hasta la cosecha. Las operaciones de la empresa representaron en el Ranking de Impuestos (2014) la posición N° 10, como una de las mejores empresas aportantes al fisco con Gs. 82.765.751.988, el criterio utilizado por el fisco incluye todos los pagos efectuados a la SET y las retenciones que le fueron practicadas. Lo que confirma también el compromiso de esta firma con el desarrollo económico del país.
            </p>
          </div>
        </div>
        <button 
          onClick={prevImage} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
});

export default HeaderAs;
import React, { useState, forwardRef } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: "QUIÉNES SOMOS", href: "#quienes-somos" },
  { name: "NUESTRAS EMPRESAS", href: "#nuestras-empresas" },
  { name: "RSE", href: "#rse" },
  { name: "CONTÁCTENOS", href: "#contacto" },
  { name: "TRABAJA CON NOSOTROS", href: "/postulacion" },
];

const HeaderGf = forwardRef(({ onNavClick, quienesSomosRef }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    onNavClick(href);
    setIsMenuOpen(false);
  };

  return (
    <div ref={ref} className="bg-gradient-to-b from-customBlue to-customBlue">
      <header className="relative">
        <div className="bg-customBlue py-2">
          <div className="container mx-auto px-4">
            {/* Contenido de la barra superior */}
          </div>
        </div>
        <nav className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center space-x-2">
                <img src='/img/GrupoFavero.png' alt="Grupo Favero Logo" className="h-12 w-auto" loading="eager" />
              </a>
              
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-customBlue hover:text-blue-400 transition-colors font-semibold"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <button
                className="md:hidden text-customBlue"
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
                  className="block py-2 text-customBlue hover:text-customBlue transition-colors font-semibold"
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

export default HeaderGf;
import React, { useState, forwardRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: "NOSOTROS", href: "/Agro-Silo/#nosotrosAs" },
  { name: "SOLUCIONES", href: "/Agro-Silo/SolucionesAs" },
  { name: "NUESTRAS SUCURSALES", href: "/Agro-Silo/#nuestras-sucursalesAs" },
  { name: "CONTÁCTENOS", href: "/Agro-Silo/#contactoAs" },
  { name: "TRABAJA CON NOSOTROS", href: "/Agro-Silo/PostulacionAs" },
];

const HeaderAs = forwardRef(({ onNavClick }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    onNavClick(href);
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    onNavClick('/Agro-Silo/');
  };

  return (
    <div ref={ref} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-customGreen to-customGreen'}`}>
      <header>
        {!isScrolled && (
          <div className="bg-customGreen py-2 w-full">
            <div className="container mx-auto px-4">
              <Link to="/" className="text-white hover:text-green-200 transition-colors">
                ← Volver al Grupo Favero
              </Link>
            </div>
          </div>
        )}
        <nav className={`${isScrolled ? 'py-2' : 'py-4'} transition-all duration-300`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <a href="/Agro-Silo/" onClick={handleLogoClick} className="flex items-center space-x-2">
                <img src='/img/AgroSilo2.png' alt="Agro Silo Logo" className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'} w-auto`} loading="eager" />
              </a>
              
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`transition-colors font-semibold ${isScrolled ? 'text-customGreen hover:text-green-400' : 'text-white hover:text-green-200'}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <button
                className={`md:hidden ${isScrolled ? 'text-customGreen' : 'text-white'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
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
                  className="block py-2 text-customGreen hover:text-green-400 transition-colors font-semibold"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
});

export default HeaderAs;
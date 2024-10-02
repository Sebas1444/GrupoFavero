import React, { useState, forwardRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const navItems = [
  { name: "QUIÉNES SOMOS", href: "/#quienes-somos" },
  { name: "NUESTRAS EMPRESAS", href: "/#nuestras-empresas" },
  { name: "RSE", href: "/#rse" },
  { name: "CONTÁCTENOS", href: "/#contacto" },
  { name: "TRABAJA CON NOSOTROS", href: "/PostulacionGf" },
];

const HeaderGf = forwardRef(({ onNavClick }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (location.pathname === '/' && href.startsWith('/#')) {
      onNavClick(href.substring(1));
    } else {
      onNavClick(href);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div ref={ref} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-customBlue to-customBlue'}`}>
      <header>
        <nav className={`${isScrolled ? 'py-2' : 'py-4'} transition-all duration-300`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <a href="/" onClick={handleLogoClick} className="flex items-center space-x-2">
                <img src='/img/GrupoFavero.png' alt="Grupo Favero Logo" className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'} w-auto`} loading="eager" />
              </a>
              
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`transition-colors font-semibold ${isScrolled ? 'text-customBlue hover:text-blue-400' : 'text-white hover:text-blue-200'}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <button
                className={`md:hidden ${isScrolled ? 'text-customBlue' : 'text-white'}`}
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
                  className="block py-2 text-customBlue hover:text-blue-400 transition-colors font-semibold"
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

export default HeaderGf;
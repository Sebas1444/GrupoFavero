import React, { useState, forwardRef, useEffect } from 'react';  // Importa hooks de React
import { Menu, X } from 'lucide-react';  // Importa los iconos de menú y cerrar desde la librería 'lucide-react'
import { useLocation } from 'react-router-dom';  // Importa el hook 'useLocation' para obtener la ubicación de la ruta actual

// Elementos de navegación
const navItems = [
  { name: "QUIÉNES SOMOS", href: "/#quienes-somos" },
  { name: "NUESTRAS EMPRESAS", href: "/#nuestras-empresas" },
  { name: "RSE", href: "/#rse" },
  { name: "CONTÁCTENOS", href: "/#contacto" },
  { name: "TRABAJA CON NOSOTROS", href: "/PostulacionGf" },
];

// Componente principal del encabezado, envuelto con forwardRef para permitir la referencia externa
const HeaderGf = forwardRef(({ onNavClick }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);   // Estado que controla si el menú móvil está abierto o cerrado
  const [isScrolled, setIsScrolled] = useState(false);    // Estado que controla si la página ha sido desplazada
  const location = useLocation();   // Hook que obtiene la ubicación de la ruta actual

  // Efecto para manejar el desplazamiento (scroll) de la página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);  // Establece 'isScrolled' como verdadero si el scroll es mayor a 0
    };

    window.addEventListener('scroll', handleScroll);  // Añade un listener de evento para el scroll
    return () => window.removeEventListener('scroll', handleScroll);  // Limpia el listener cuando el componente se desmonta
  }, []);

  // Función para manejar los clics en los elementos de navegación
  const handleNavClick = (e, href) => {
    e.preventDefault();  // Previene la acción predeterminada del enlace
    if (location.pathname === '/' && href.startsWith('/#')) {
      onNavClick(href.substring(1));  // Si la ruta actual es '/', navega a una sección interna
    } else {
      onNavClick(href);  // Si es otro enlace, navega a la ruta especificada
    }
    setIsMenuOpen(false);  // Cierra el menú móvil tras hacer clic
  };

  // Función para manejar el clic en el logo y redirigir a la página principal
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/';  // Redirige a la página principal
  };

  return (
    <div ref={ref} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-customBlue to-customBlue'}`}>
      {/* Contenedor principal del encabezado */}
      <header>
        <nav className={`${isScrolled ? 'py-2' : 'py-4'} transition-all duration-300`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo, que cambia de tamaño dependiendo del desplazamiento */}
              <a href="/" onClick={handleLogoClick} className="flex items-center space-x-2">
                {isScrolled ? (
                  <img src='/img/GrupoFavero.png' alt="Agro Silo Logo" className="h-10 w-auto transition-all duration-300" loading="eager" />
                ) : (
                  <img src='/img/GrupoFavero2.png' alt="Agro Silo Logo" className="h-12 w-auto transition-all duration-300" loading="eager" />
                )}
              </a>
              
              {/* Menú de navegación en desktop */}
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`transition-colors font-semibold ${isScrolled ? 'text-customBlue hover:text-blue-400' : 'text-white hover:text-blue-200'}`}
                    onClick={(e) => handleNavClick(e, item.href)}  // Llama a handleNavClick cuando se hace clic en un enlace
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Menú de hamburguesa en móviles */}
              <button
                className={`md:hidden ${isScrolled ? 'text-customBlue' : 'text-white'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}  // Alterna el estado de apertura/cierre del menú móvil
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}  {/* Muestra el ícono de abrir o cerrar menú */}
              </button>
            </div>
          </div>
        </nav>

        {/* Menú de navegación móvil */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-customBlue hover:text-blue-400 transition-colors font-semibold"
                  onClick={(e) => handleNavClick(e, item.href)}  // Llama a handleNavClick cuando se hace clic en un enlace
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

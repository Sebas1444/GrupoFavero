import React, { useState } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: "QUIÉNES SOMOS", href: "/#quienes-somos" },
  { name: "NUESTRAS EMPRESAS", href: "/#nuestras-empresas" },
  { name: "RSE", href: "/#rse" },
  { name: "CONTÁCTENOS", href: "/#contacto" },
  { name: "TRABAJA CON NOSOTROS", href: "/PostulacionGf" },
];

export default function PostulacionGf() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      navigate(href);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white shadow-md">
        <div className="bg-customBlue py-2">
          <div className="container mx-auto px-4">
            {/* Contenido de la barra superior */}
          </div>
        </div>
        <nav className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src='/img/GrupoFavero.png' alt="Grupo Favero Logo" className="h-12 w-auto" loading="eager" />
            </Link>
            
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
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-customBlue hover:text-blue-400 transition-colors font-semibold"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-customBlue mb-6">Trabaja con Nosotros</h1>
        <p className="text-gray-600 mb-4">
          Bienvenido a nuestra página de postulaciones. Aquí podrás encontrar información sobre nuestras ofertas de trabajo y cómo aplicar.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-customBlue mb-4">Formulario de Postulación</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre completo</label>
              <input type="text" id="nombre" name="nombre" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customBlue focus:ring focus:ring-customBlue focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customBlue focus:ring focus:ring-customBlue focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Adjuntar CV</label>
              <input type="file" id="cv" name="cv" className="mt-1 block w-full" />
            </div>
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customBlue focus:ring focus:ring-customBlue focus:ring-opacity-50"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-customBlue text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-opacity-50">
                Enviar Postulación
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-customBlue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://www.facebook.com/grupofavero" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/grupofaveropy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@grupofavero5232" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <p className="text-center md:text-left mb-4 md:mb-0">
              © 2024 Grupo Favero. Todos los derechos reservados.
            </p>
            <p className="text-sm">Diseñado por {"{ESCA}"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
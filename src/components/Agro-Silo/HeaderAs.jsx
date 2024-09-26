import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderAs() {
  return (
    <header className="bg-blue-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Agro-Silo Santa Catalina</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#servicios" className="hover:text-blue-300">Servicios</a></li>
            <li><a href="#sobre-nosotros" className="hover:text-blue-300">Sobre Nosotros</a></li>
            <li><a href="#contacto" className="hover:text-blue-300">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
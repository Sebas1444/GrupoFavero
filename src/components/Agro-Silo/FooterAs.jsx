import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function FooterAs() {
  return (
    <footer className="bg-customGreen text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-8 mb-4 md:mb-0">
            <a href="https://www.facebook.com/grupofavero" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-transform duration-300 ease-in-out hover:scale-125">
              <Facebook className="w-8 h-8" />
            </a>
            <a href="https://www.instagram.com/grupofaveropy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform duration-300 ease-in-out hover:scale-125">
              <Instagram className="w-8 h-8" />
            </a>
            <a href="https://www.youtube.com/@grupofavero5232" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-transform duration-300 ease-in-out hover:scale-125">
              <Youtube className="w-8 h-8" />
            </a>
          </div>
          <p className="text-center md:text-left mb-4 md:mb-0">
            © 2024 Grupo Favero. Todos los derechos reservados.
          </p>
          <p className="text-sm">Diseñado por {"{ESCA}"}</p>
        </div>
      </div>
    </footer>
  );
}
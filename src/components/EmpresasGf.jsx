import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const empresas = [
  { nombre: "Agro Silo Santa Catalina", logo: "/img/logo/logo-agrosilo.png?height=150&width=150", link: "/Agro-Silo" },
  { nombre: "Agrotoro", logo: "/img/logo/logo-agrotoro.png?height=150&width=150", link: "/Agro-Toro" },
  { nombre: "Ganadera Forestal Santa Catalina", logo: "/img/logo/logo-santacatalina.png?height=150&width=150", link: "/Santa-Catalina" },
  { nombre: "Aktra", logo: "/img/logo/logo-aktra.png?height=150&width=150", link: "/Aktra" },
  { nombre: "Semillas Veronica", logo: "/img/logo/logo-veronica.png?height=150&width=150", link: "/Semillas-Veronica" },
  { nombre: "Ganadera Campobello", logo: "/img/logo/logo-campobello.png?height=150&width=150", link: "/Campobello" },
  { nombre: "Totemsa", logo: "/img/logo/logo-totemsa.png?height=150&width=150", link: "/Totemsa" },
  { nombre: "Espigon", logo: "/img/logo/logo-espigon.png?height=150&width=150", link: "/Espigon" },
  { nombre: "New Holland", logo: "/img/logo/logo-newholland.png?height=150&width=150", link: "/New-Holland" },
];

export default function EmpresasGf() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const empresasPerView = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(empresas.length / empresasPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlide, currentIndex]);

  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-customBlue mb-16 text-center">NUESTRAS EMPRESAS</h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <div key={slideIndex} className="flex justify-center w-full flex-shrink-0">
                {empresas.slice(slideIndex * empresasPerView, (slideIndex + 1) * empresasPerView).map((empresa, index) => (
                  <div key={index} className={`${isMobile ? 'w-full' : 'w-1/3'} px-2`}>
                    <div className="bg-gray-100 rounded-2xl p-2 w-40 h-40 mx-auto flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="w-36 h-36 flex items-center justify-center relative">
                        <Link 
                          to={empresa.link} 
                          className="block w-full h-full transition-transform duration-300 hover:scale-110"
                          aria-label={`Visitar página de ${empresa.nombre}`}
                        >
                          <img src={empresa.logo} alt={empresa.nombre} className="max-w-full max-h-full object-contain" />
                        </Link>
                      </div>
                    </div>
                    <p className="text-center text-sm font-bold text-customBlue mt-2">{empresa.nombre}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Empresas anteriores"
          >
            <ChevronLeft className="w-6 h-6 text-customBlue" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Siguientes empresas"
          >
            <ChevronRight className="w-6 h-6 text-customBlue" />
          </button>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-customBlue' : 'bg-gray-300'
              }`}
              aria-label={`Ir al grupo de empresas ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
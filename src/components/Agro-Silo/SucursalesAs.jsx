import React, { useState, useEffect, useRef } from 'react';

const sucursales = [
  { id: 1, nombre: "Asunción", x: 45.71, y: 66.67, telefono: "(021) 646 284 / 645 931" },
  { id: 2, nombre: "Los Cedrales", x: 78.57, y: 78.95, telefono: "(0455) 212 450" },
  { id: 3, nombre: "Santa Rita", x: 74.29, y: 73.68, telefono: "(0673) 220 414 / 221 115" },
  { id: 4, nombre: "Tirol", x: 68.57, y: 70.18, telefono: "(0673) 220 414" },
  { id: 5, nombre: "Nueva Aurora", x: 64.29, y: 66.67, telefono: "(0673) 220 414" },
  { id: 6, nombre: "Pindo", x: 70, y: 77.19, telefono: "(0673) 220 414" },
  { id: 7, nombre: "Capibary", x: 57.14, y: 56.14, telefono: "(0455) 212 450" },
  { id: 8, nombre: "Río Verde", x: 61.43, y: 61.40, telefono: "(0455) 212 450" },
  { id: 9, nombre: "Katuete", x: 65.71, y: 52.63, telefono: "(0455) 212 450" },
];

export default function SucursalesAs() {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let timer;
    if (sucursalSeleccionada !== null) {
      setTiempoRestante(3);
      timer = setInterval(() => {
        setTiempoRestante((prevTiempo) => {
          if (prevTiempo <= 0) {
            clearInterval(timer);
            setSucursalSeleccionada(null);
            return 0;
          }
          return prevTiempo - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [sucursalSeleccionada]);

  const handleClick = (id) => {
    setSucursalSeleccionada(id);
  };

  const getGreenIntensity = () => {
    return Math.max(0, Math.min(1, tiempoRestante / 3));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8" id="nuestras-sucursalesAs">Nuestras Sucursales</h2>
      <div 
        ref={mapRef}
        className={`relative transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <img src="/img/mapa_py_agrosilo-u3159-fr.png" alt="Mapa de Paraguay" className="w-full" />
        {sucursales.map((sucursal) => (
          <button
            key={sucursal.id}
            className="absolute w-3 h-3 md:w-6 md:h-6 rounded-full transition-all duration-300"
            style={{
              left: `${sucursal.x}%`,
              top: `${sucursal.y}%`,
              backgroundColor: sucursalSeleccionada === sucursal.id
                ? `rgba(0, 128, 0, ${getGreenIntensity()})`
                : 'white',
              transform: sucursalSeleccionada === sucursal.id ? 'scale(1.5)' : 'scale(1)',
            }}
            onClick={() => handleClick(sucursal.id)}
          >
            <span className="sr-only">{sucursal.nombre}</span>
          </button>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Información de las Sucursales</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sucursales.map((sucursal) => (
            <li 
              key={sucursal.id} 
              className="p-4 border rounded shadow transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: sucursalSeleccionada === sucursal.id
                  ? `rgba(0, 128, 0, ${getGreenIntensity()})`
                  : 'white',
                color: sucursalSeleccionada === sucursal.id ? 'white' : 'black',
              }}
              onClick={() => handleClick(sucursal.id)}
            >
              <h4 className="font-bold">{sucursal.nombre}</h4>
              <p>Teléfono: {sucursal.telefono}</p>
              <p>Email: {sucursal.nombre.toLowerCase().replace(' ', '')}@agrosilo.com.py</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
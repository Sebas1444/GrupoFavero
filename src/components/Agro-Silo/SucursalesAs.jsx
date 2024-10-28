import React, { useState, useEffect, useRef } from 'react';

const sucursales = [
  { id: 1, nombre: "Grupo Favero", lat: -25.252454009804826, lng: -57.512842292365505, direccion: "Casa Matriz Asunción", telefono: "(021) 646 284 / 645 931" },
  { id: 2, nombre: "Agro Silo Santa Catalina", lat: -24.2581496767441, lng: -54.790305239480155, direccion: "Katuete", telefono: "(0986) 454 861" },
  { id: 3, nombre: "Agro Silo Santa Catalina", lat: -25.65459841137151, lng: -54.72133857202692, direccion: "Los Cedrales", telefono: "(0633) 220 071 / 74" },
  { id: 4, nombre: "Agro Silo Santa Catalina", lat: -25.75342290979727, lng: -54.90680440913097, direccion: "Santa Lucia", telefono: "(0983) 406 007" },
  { id: 5, nombre: "Agro Silo Santa Catalina", lat: -26.000640484555543, lng: -54.746212321755245, direccion: "Hacienda Espigon", telefono: "(0983) 406 007" },
  { id: 6, nombre: "Semillas Veronica", lat: -26.042727217310347, lng: -54.78909704429727, direccion: "Colonia Mbarete", telefono: "(0983) 406 006" },
  { id: 7, nombre: "Agro Silo Santa Catalina", lat: -26.1695346320873, lng: -55.18255217840337, direccion: "Raul Peña", telefono: "(0983) 406 004" },
  { id: 8, nombre: "Agro Silo Santa Catalina", lat: -26.078195644068323, lng: -54.89457600009627, direccion: "Colonia Mbarete", telefono: "(0983) 406 005" },
  { id: 9, nombre: "Agro Silo Santa Catalina", lat: -26.31935947006864, lng: -55.39923585730032, direccion: "Nueva Aurora", telefono: "(0983) 406 002" },
  { id: 10, nombre: "Semillas Veronica", lat: -25.895684788922438, lng: -55.5475470030588, direccion: "Linea Paulista", telefono: "(0527) 20 114" },
  { id: 11, nombre: "Agro Silo Santa Catalina", lat:-25.895684788922438, lng: -55.5475470030588, direccion: "Linea Paulista", telefono: "(0527) 20 114" },
  { id: 12, nombre: "Agro Silo Santa Catalina", lat: -25.920190044401743, lng: -55.232448531782495, direccion: "Ñacunday", telefono: "(0983) 285 823" },
  { id: 13, nombre: "Agro Silo Santa Catalina", lat: -25.81980551407075, lng: -55.11117104224701, direccion: "Santa Rita", telefono: "(0983) 400 310" },
  { id: 14, nombre: "Agro Silo Santa Catalina", lat: -25.15801146668673, lng: -55.52654345968022, direccion: "Casilla Dos", telefono: "(0983) 406 008" },
  { id: 15, nombre: "Agro Silo Santa Catalina", lat: -24.820659990099834, lng: -55.55387405427783, direccion: "Colonia Pindo", telefono: "(0983) 406 009" },
  { id: 16, nombre: "Agro Silo Santa Catalina", lat: -23.755467, lng: -56.493054, direccion: "Rio Verde", telefono: "(0981) 114 900" },
  { id: 17, nombre: "Agrotoro", lat: -26.117961940112444, lng: -54.724264610123356, direccion: "Ñacunday", telefono: "(0981) 173 636" },
  { id: 18, nombre: "Totemsa", lat: -26.123898, lng: -54.665353, direccion: "Ñacunday", telefono: "(0981) 173 345" },
  { id: 19, nombre: "Agro Silo Santa Catalina", lat: -26.449932, lng: -54.858528, direccion: "Los Lapachos", telefono: "" },
];

export default function SucursalesAs() {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const adjustMapHeight = () => {
      if (listRef.current && mapRef.current) {
        mapRef.current.style.height = `${listRef.current.offsetHeight}px`;
      }
    };

    adjustMapHeight();
    window.addEventListener('resize', adjustMapHeight);

    return () => window.removeEventListener('resize', adjustMapHeight);
  }, []);

  useEffect(() => {
    let timer;
    if (modalVisible) {
      timer = setTimeout(() => {
        setModalVisible(false);
        setSucursalSeleccionada(null);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [modalVisible]);

  const handleSucursalClick = (sucursal) => {
    setSucursalSeleccionada(sucursal);
    setModalVisible(true);
  };

  const handleUbicacionClick = () => {
    if (sucursalSeleccionada) {
      const { lat, lng } = sucursalSeleccionada;
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8" id="nuestras-sucursalesAs">NUESTRAS SUCURSALES</h2>
      <div className="flex flex-col md:flex-row justify-center items-start">
        <div className="w-full md:w-2/3 relative mb-8 md:mb-0" ref={mapRef}>
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/img/MapaPY3.png" 
              alt="Mapa de Paraguay" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 md:pl-8" ref={listRef}>
          <h3 className="text-2xl font-semibold mb-4">Información de las Sucursales</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {sucursales.map((sucursal, index) => (
              <div 
                key={sucursal.id} 
                className="p-4 border rounded shadow transition-all duration-300 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSucursalClick(sucursal)}
              >
                <h4 className="font-bold">{index + 1}. {sucursal.nombre}</h4>
                <p>{sucursal.direccion}</p>
                <p>Teléfono: {sucursal.telefono}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalVisible && sucursalSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">{sucursalSeleccionada.nombre}</h3>
            <p>{sucursalSeleccionada.direccion}</p>
            <p>Teléfono: {sucursalSeleccionada.telefono}</p>
            <button 
              className="mt-4 bg-customGreen text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
              onClick={handleUbicacionClick}
            >
              Ver ubicación en Google Maps
            </button>
            <button 
              className="mt-4 ml-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-200"
              onClick={() => setModalVisible(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

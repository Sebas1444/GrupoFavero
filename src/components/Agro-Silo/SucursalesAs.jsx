import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const sucursales = [
  { id: 1, nombre: "Grupo Favero", lat: -25.2867, lng: -57.3333, direccion: "Casa Matriz Asunción", telefono: "(021) 646 284 / 645 931" },
  { id: 2, nombre: "Agro Silo Santa Catalina", lat: -24.2078, lng: -54.6806, direccion: "Katuete", telefono: "(0986) 454 861" },
  { id: 3, nombre: "Agro Silo Santa Catalina", lat: -25.6667, lng: -54.8333, direccion: "Los Cedrales", telefono: "(0633) 220 071 / 74" },
  { id: 4, nombre: "Agro Silo Santa Catalina", lat: -26.0833, lng: -56.8333, direccion: "Santa Lucia", telefono: "(0983) 406 007" },
  { id: 5, nombre: "Agro Silo Santa Catalina", lat: -25.4167, lng: -54.6667, direccion: "Hacienda Espigon", telefono: "(0983) 406 007" },
  { id: 6, nombre: "Semillas Veronica", lat: -24.7833, lng: -54.7333, direccion: "Colonia Mbarete", telefono: "(0983) 406 006" },
  { id: 7, nombre: "Agro Silo Santa Catalina", lat: -26.0167, lng: -55.6333, direccion: "Raul Peña", telefono: "(0983) 406 004" },
  { id: 8, nombre: "Agro Silo Santa Catalina", lat: -24.7833, lng: -54.7333, direccion: "Colonia Mbarete", telefono: "(0983) 406 005" },
  { id: 9, nombre: "Agro Silo Santa Catalina", lat: -26.5667, lng: -55.0667, direccion: "Nueva Aurora", telefono: "(0983) 406 002" },
  { id: 10, nombre: "Semillas Veronica", lat: -24.5167, lng: -54.7667, direccion: "Linea Paulista", telefono: "(0527) 20 114" },
  { id: 11, nombre: "Agro Silo Santa Catalina", lat: -24.5167, lng: -54.7667, direccion: "Linea Paulista", telefono: "(0527) 20 114" },
  { id: 12, nombre: "Agro Silo Santa Catalina", lat: -26.0500, lng: -54.7667, direccion: "Ñacunday", telefono: "(0983) 285 823" },
  { id: 13, nombre: "Agro Silo Santa Catalina", lat: -26.8667, lng: -55.7833, direccion: "Colonia Pindo", telefono: "(0983) 400 310" },
  { id: 14, nombre: "Agro Silo Santa Catalina", lat: -25.8500, lng: -56.3667, direccion: "Rio Verde", telefono: "(0983) 406 008" },
  { id: 15, nombre: "Agro Silo Santa Catalina", lat: -26.8667, lng: -55.7833, direccion: "Colonia Pindo", telefono: "(0983) 406 009" },
  { id: 16, nombre: "Agro Silo Santa Catalina", lat: -25.8500, lng: -56.3667, direccion: "Rio Verde", telefono: "(0981) 114 900" },
  { id: 17, nombre: "Agrotoro", lat: -26.0500, lng: -54.7667, direccion: "Ñacunday", telefono: "(0981) 173 636" },
  { id: 18, nombre: "Totemsa", lat: -26.0500, lng: -54.7667, direccion: "Ñacunday", telefono: "(0981) 173 345" },
  { id: 19, nombre: "Agro Silo Santa Catalina", lat: -26.6167, lng: -55.5000, direccion: "Los Lapachos", telefono: "" },
];

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -23.442503,
  lng: -58.443832
};

export default function SucursalesAs() {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);

  const handleMarkerClick = (sucursal) => {
    setSucursalSeleccionada(sucursal);
  };

  return (
    <div className="container mx-auto px-4 py-8 " >
      <h2 className="text-3xl font-bold text-center mb-8" id="nuestras-sucursalesAs">Nuestras Sucursales</h2>
      <div className="flex flex-col md:flex-row justify-center items-start">
        <div className="w-full md:w-2/3 mb-8 md:mb-0">
          <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={7}
            >
              {sucursales.map((sucursal) => (
                <Marker
                  key={sucursal.id}
                  position={{ lat: sucursal.lat, lng: sucursal.lng }}
                  onClick={() => handleMarkerClick(sucursal)}
                />
              ))}
              {sucursalSeleccionada && (
                <InfoWindow
                  position={{ lat: sucursalSeleccionada.lat, lng: sucursalSeleccionada.lng }}
                  onCloseClick={() => setSucursalSeleccionada(null)}
                >
                  <div>
                    <h3 className="font-bold">{sucursalSeleccionada.nombre}</h3>
                    <p>{sucursalSeleccionada.direccion}</p>
                    <p>Teléfono: {sucursalSeleccionada.telefono}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="w-full md:w-1/3 md:pl-8">
          <h3 className="text-2xl font-semibold mb-4">Información de las Sucursales</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {sucursales.map((sucursal) => (
              <div 
                key={sucursal.id} 
                className="p-4 border rounded shadow transition-all duration-300 cursor-pointer"
                onClick={() => handleMarkerClick(sucursal)}
              >
                <h4 className="font-bold">{sucursal.nombre}</h4>
                <p>{sucursal.direccion}</p>
                <p>Teléfono: {sucursal.telefono}</p>
                <a href="mailto:info@agrosilo.com.py" className="text-customGreen hover:underline">
                  info@agrosilo.com.py
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
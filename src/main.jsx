import React from 'react';               // Importa la biblioteca React para poder usar JSX
import './index.css';                    // Importa los estilos globales de la aplicación
import ReactDOM from 'react-dom/client';  // Importa el método para renderizar la aplicación en el DOM
import { BrowserRouter as Router } from 'react-router-dom'; // Importa el enrutador de React para manejar las rutas
import { App } from './App';              // Importa el componente principal de la aplicación

const root = ReactDOM.createRoot(document.getElementById('root')); // Selecciona el elemento con id 'root' en el HTML donde se renderizará la app

root.render(
  <Router>                              {/* Envolvemos la aplicación con el Router para gestionar las rutas */}
    <App />                              {/* Renderiza el componente principal de la app */}
  </Router>
);

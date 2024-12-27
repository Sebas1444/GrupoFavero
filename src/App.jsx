import React, { useRef, useEffect, useState } from 'react';  // Importa hooks de React
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';  // Importa componentes y hooks de react-router-dom
import HeaderGf from "./components/HeaderGf"; // Importa componentes personalizados
import LaEmpresaGf from "./components/LaEmpresaGf";
import EmpresasGf from "./components/EmpresasGf";
import RseGf from "./components/RseGf";
import ContactoGf from "./components/ContactoGf";
import FooterGf from "./components/FooterGf";
import AgroSiloApp from "./components/Agro-Silo/App";
import GcampobelloApp from "./components/Gcampobello/App";
import PostulacionGf from "./components/PostulacionGf";
import AdminRSE from "./components/AdminRSE";
import LoginAdmin from "./components/LoginAdmin";

// Componente principal de la aplicación
function MainApp() { 
  const headerRef = useRef(null);       // Referencia al encabezado
  const location = useLocation();       // Hook para obtener la ubicación actual (ruta)
  const navigate = useNavigate();       // Hook para cambiar de ruta programáticamente

  // Función que maneja los clics en los elementos de navegación
  const handleNavClick = (href) => {
    if (href.startsWith('/')) {
      navigate(href);  // Navega a una nueva ruta
    } else if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        const yOffset = -headerRef.current.offsetHeight;  // Ajuste para compensar la altura del encabezado
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });  // Desplaza suavemente a la sección
      }
    }
  };

  // Efecto que se ejecuta cada vez que cambia la ubicación (cuando se navega)
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          const yOffset = -headerRef.current.offsetHeight;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 0);
    }
  }, [location]);

  return (
    <>
      <HeaderGf ref={headerRef} onNavClick={handleNavClick} />  {/* Encabezado con navegación */}
      <main className="pt-16">
        <section id="quienes-somos">
          <LaEmpresaGf />  {/* Sección "Quiénes somos" */}
        </section>
        <section id="nuestras-empresas">
          <EmpresasGf />  {/* Sección "Nuestras empresas" */}
        </section>
        <section id="rse">
          <RseGf />  {/* Sección "RSE" */}
        </section>
        <section id="contacto">
          <ContactoGf />  {/* Sección de contacto */}
        </section>
      </main>
      <FooterGf />  {/* Pie de página */}
    </>
  );
}

// Componente que maneja rutas protegidas por autenticación (En construcción)
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('adminToken');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          localStorage.removeItem('adminToken');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;  // Redirige a login si no está autenticado
  }

  return children;  // Renderiza los hijos si está autenticado
}

// Componente principal que maneja las rutas de la aplicación
export function App() {
  return (
    <Routes>  {/* Componente de rutas */}
      <Route path="/" element={<MainApp />} />  {/* Ruta principal */}
      <Route path="/Agro-Silo/*" element={<AgroSiloApp />} />  {/* Ruta para Agro-Silo */}
      <Route path="/Gcampobello/*" element={<GcampobelloApp />} />  {/* Ruta para Gcampobello */}
      <Route path="/PostulacionGf" element={<PostulacionGf />} />  {/* Ruta para la postulación */}
      <Route path="/admin/login" element={<LoginAdmin />} />  {/* Ruta para login */}
      <Route 
        path="/admin/rse" 
        element={
          <ProtectedRoute>
            <AdminRSE />
          </ProtectedRoute>
        } 
      />  {/* Ruta protegida para administradores */}
    </Routes>
  );
}

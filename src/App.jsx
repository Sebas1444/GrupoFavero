import React, { useRef, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import HeaderGf from "./components/HeaderGf";
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

function MainApp() {
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        const yOffset = -headerRef.current.offsetHeight;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          const yOffset = -headerRef.current.offsetHeight;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      }, 0);
    }
  }, [location]);

  return (
    <>
      <HeaderGf ref={headerRef} onNavClick={handleNavClick} />
      <main className="pt-16">
        <section id="quienes-somos">
          <LaEmpresaGf />
        </section>
        <section id="nuestras-empresas">
          <EmpresasGf />
        </section>
        <section id="rse">
          <RseGf />
        </section>
        <section id="contacto">
          <ContactoGf />
        </section>
      </main>
      <FooterGf />
    </>
  );
}

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
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/Agro-Silo/*" element={<AgroSiloApp />} />
      <Route path="/Gcampobello/*" element={<GcampobelloApp />} />
      <Route path="/PostulacionGf" element={<PostulacionGf />} />
      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route 
        path="/admin/rse" 
        element={
          <ProtectedRoute>
            <AdminRSE />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
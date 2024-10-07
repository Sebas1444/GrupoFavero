import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HeaderAs from './HeaderAs';
import LaEmpresaAs from './LaEmpresaAs';
import SucursalesAs from './SucursalesAs';
import ContactoAs from './ContactoAs';
import FooterAs from './FooterAs';
import PostulacionAs from './PostulacionAs';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  const handleNavClick = (href) => {
    if (href.startsWith('/Agro-Silo/#')) {
      const id = href.split('#')[1];
      if (location.pathname !== '/Agro-Silo') {
        navigate('/Agro-Silo');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (href.startsWith('/Agro-Silo/')) {
      navigate(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAs onNavClick={handleNavClick} />

      <main className="flex-grow" style={{ marginTop: `${headerHeight}px` }}>
        <Routes>
          <Route path="/Agro-Silo" element={<LaEmpresaAs onNavClick={handleNavClick} />} />
          <Route path="/PostulacionAs" element={<PostulacionAs />} />
          <Route path="*" element={<LaEmpresaAs onNavClick={handleNavClick} />} />
        </Routes>
      </main>

      <SucursalesAs />
      <ContactoAs />
      <FooterAs />
    </div>
  );
}
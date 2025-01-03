import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HeaderAs from './HeaderAs';
import LaEmpresaAs from './LaEmpresaAs';
import NosotrosAs from './NosotrosAs';
import SolucionesAs from './SolucionesAs';
import SucursalesAs from './SucursalesAs';
import ContactoAs from './ContactoAs';
import FooterAs from './FooterAs';
import PostulacionAs from './PostulacionAs';
import AcopioAs from './AcopioAs';
import GranosAs from './GranosAs';

export default function App() {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -headerHeight;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavClick = (href) => {
    if (href.startsWith('/Agro-Silo/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      scrollToSection(href.substring(1));
    }
  };
  
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        scrollToSection(location.hash.substring(1));
      }, 0);
    }
  }, [location, headerHeight]);

  function MainContent({ onNavClick }) {
    return (
      <>
        <LaEmpresaAs onNavClick={onNavClick} />
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            <section className="py-16" id="nosotrosAs">
              <NosotrosAs />
            </section>
            <section className="py-16"  id="nuestras-sucursalesAs">
              <SucursalesAs />
            </section>
            <section className="py-16" id="contactoAs">
              <ContactoAs />
            </section>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderAs ref={headerRef} onNavClick={handleNavClick} />

      <main className="flex-grow" style={{ paddingTop: `${headerHeight}px` }}>
        <Routes>
          <Route path="/Agro-Silo" element={<MainContent onNavClick={handleNavClick} />} />
          <Route path="/PostulacionAs" element={<PostulacionAs />} />
          <Route path="/SolucionesAs" element={<SolucionesAs />} />
          <Route path="/AcopioAs" element={<AcopioAs />} />
          <Route path="/GranosAs" element={<GranosAs />} />
          <Route path="*" element={<MainContent onNavClick={handleNavClick} />} />
        </Routes>
      </main>
      <FooterAs />
    </div>
  );
}
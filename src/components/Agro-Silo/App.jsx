import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HeaderAs from './HeaderAs';
import LaEmpresaAs from './LaEmpresaAs';
import NosotrosAs from './NosotrosAs';
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
      navigate('/Agro-Silo');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -headerHeight;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderAs onNavClick={handleNavClick} />

      <main className="flex-grow" style={{ marginTop: `${headerHeight}px` }}>
        <Routes>
          <Route path="/Agro-Silo" element={<MainContent onNavClick={handleNavClick} />} />
          <Route path="/PostulacionAs" element={<PostulacionAs />} />
          <Route path="*" element={<MainContent onNavClick={handleNavClick} />} />
        </Routes>
      </main>
      <FooterAs />
    </div>
  );
}

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
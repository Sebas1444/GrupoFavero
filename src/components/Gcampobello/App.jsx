import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HeaderGc from './HeaderGc';
import LaEmpresaGc from './LaEmpresaGc';
// import NosotrosGc from './NosotrosGc';
// import ContactoGc from './ContactoGc';
// import FooterGc from './FooterGc';
// import PostulacionGc from './PostulacionGc';


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
    if (href.startsWith('/Gcampobello/#')) {
      const id = href.split('#')[1];
      navigate('/Gcampobello');
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
      <HeaderGc onNavClick={handleNavClick} />

      <main className="flex-grow" style={{ marginTop: `${headerHeight}px` }}>
        <Routes>
          <Route path="/Gcampobello" element={<MainContent onNavClick={handleNavClick} />} />
          {/* <Route path="/PostulacionGc" element={<PostulacionGc />} /> */}
          <Route path="*" element={<MainContent onNavClick={handleNavClick} />} />
        </Routes>
      </main>
      <FooterGc />
    </div>
  );
}

function MainContent({ onNavClick }) {
  return (
    <>
      <LaEmpresaGc onNavClick={onNavClick} />
      {/* <div className="container mx-auto px-4">
        <div className="space-y-32">
          <section className="py-16" id="nosotrosGc">
            <NosotrosGc />
          </section>
          <section className="py-16" id="contactoGc">
            <ContactoGc />
          </section>
        </div>
      </div> */}
    </>
  );
}
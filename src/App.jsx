import React, { useRef, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HeaderGf from "./components/HeaderGf";
import LaEmpresaGf from "./components/LaEmpresaGf";
import EmpresasGf from "./components/EmpresasGf";
import RseGf from "./components/RseGf";
import ContactoGf from "./components/ContactoGf";
import FooterGf from "./components/FooterGf";
import AgroSiloApp from "./components/Agro-Silo/App";
import GcampobelloApp from "./components/Gcampobello/App";
import PostulacionGf from "./components/PostulacionGf";

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

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/Agro-Silo/*" element={<AgroSiloApp />} />
      <Route path="/Gcampobello/*" element={<GcampobelloApp />} />
      <Route path="/PostulacionGf" element={<PostulacionGf />} />
    </Routes>
  );
}
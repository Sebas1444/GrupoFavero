import React, { useRef, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HeaderGf from './components/HeaderGf';
import EmpresasGf from './components/EmpresasGf';
import RseGf from './components/RseGf';
import ContactoFooterGf from './components/ContactoFooterGf';
import AgroSiloApp from './components/Agro-Silo/App';
import PostulacionGf from './components/PostulacionGf';

function LazyLoad({ children, placeholder }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? children : placeholder}
    </div>
  );
}

function MainApp({ onNavClick, headerRef, quienesSomosRef, nuestrasEmpresasRef, rseRef, contactoRef }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.querySelector(`#${location.state.scrollTo}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      <HeaderGf onNavClick={onNavClick} ref={headerRef} quienesSomosRef={quienesSomosRef} />
      <div className="h-[100px]"></div>
      <LazyLoad placeholder={<div>Cargando Empresas...</div>}>
        <div ref={nuestrasEmpresasRef} id="nuestras-empresas">
          <EmpresasGf />
        </div>
      </LazyLoad>
      <LazyLoad placeholder={<div>Cargando RSE...</div>}>
        <div ref={rseRef} id="rse">
          <RseGf />
        </div>
      </LazyLoad>
      <LazyLoad placeholder={<div>Cargando Contacto...</div>}>
        <div ref={contactoRef} id="contacto">
          <ContactoFooterGf />
        </div>
      </LazyLoad>
    </>
  );
}

export function App() {
  const headerRef = useRef(null);
  const quienesSomosRef = useRef(null);
  const nuestrasEmpresasRef = useRef(null);
  const rseRef = useRef(null);
  const contactoRef = useRef(null);

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Routes>
      <Route path="/" element={
        <MainApp 
          onNavClick={handleNavClick}
          headerRef={headerRef}
          quienesSomosRef={quienesSomosRef}
          nuestrasEmpresasRef={nuestrasEmpresasRef}
          rseRef={rseRef}
          contactoRef={contactoRef}
        />
      } />
      <Route path="/Agro-Silo/*" element={<AgroSiloApp />} />
      <Route path="/PostulacionGf" element={<PostulacionGf />} />
    </Routes>
  );
}
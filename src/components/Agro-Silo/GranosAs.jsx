import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAs from './HeaderAs';

export default function GranosAs() {
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderAs onNavClick={handleNavClick} />
      <main className="flex-grow bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-12">SOLUCIONES</h1>
        


      </main>
    </div>
  );
}
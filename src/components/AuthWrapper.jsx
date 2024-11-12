import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

    events.forEach(event => window.addEventListener(event, resetTimer));

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity > 2 * 60 * 1000) { // 2 minutes
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    }, 10000); // Check every 10 seconds

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearInterval(checkInactivity);
    };
  }, [lastActivity, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && !location.pathname.includes('/admin/login')) {
      navigate('/admin/login');
    }
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div>
      <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
        Cerrar Sesión
      </button>
      {children}
    </div>
  );
};

export default AuthWrapper;
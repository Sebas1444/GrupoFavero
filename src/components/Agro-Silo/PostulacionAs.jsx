import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAs from './HeaderAs';
import FooterAs from './FooterAs';

export default function PostulacionGf() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    mensaje: '',
    cv: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

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

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      navigate(href);
    } else {
      navigate(href);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nombre.trim()) errors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) errors.apellido = "El apellido es requerido";
    if (!formData.telefono.trim()) errors.telefono = "El teléfono es requerido";
    else if (!/^\d{5,}$/.test(formData.telefono)) errors.telefono = "El teléfono debe contener al menos 5 números";
    if (!formData.email.trim()) errors.email = "El email es requerido";
    if (!formData.mensaje.trim()) errors.mensaje = "El mensaje es requerido";
    if (!formData.cv) errors.cv = "El CV es requerido";
    else {
      const allowedExtensions = ['pdf', 'doc', 'docx', 'jpeg', 'jpg'];
      const fileExtension = formData.cv.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        errors.cv = "El archivo debe ser PDF, DOC, DOCX o JPEG";
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormStatus({ type: 'info', message: 'Enviando postulación...' });
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        const response = await fetch('/postulacion/send-postulacion', {
          method: 'POST',
          body: formDataToSend,
        });

        const result = await response.json();
        if (result.success) {
          setFormStatus({ type: 'success', message: 'Postulación enviada con éxito' });
          setFormData({
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            mensaje: '',
            cv: null
          });
        } else {
          setFormStatus({ type: 'error', message: 'Error al enviar la postulación: ' + result.message });
        }
      } catch (error) {
        console.error('Error:', error);
        setFormStatus({ type: 'error', message: 'Error al enviar la postulación' });
      }
    } else {
      setFormErrors(errors);
      setFormStatus({ type: 'error', message: 'Por favor, corrija los errores en el formulario' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderAs ref={headerRef} onNavClick={handleNavClick} />
      <main className="flex-grow bg-gray-100" style={{ paddingTop: `${headerHeight}px` }}>
        <div className="container mx-auto px-4 max-w-6xl py-8">
          <h2 className="text-3xl font-bold text-customGreen mb-8 text-center">TRABAJA CON NOSOTROS</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-xl font-semibold text-customGreen mb-4">¡Forma parte de nuestro equipo de trabajo enviando tu CV!</p>
            {formStatus && (
              <div className={`mb-4 p-4 rounded-md ${
                formStatus.type === 'success' ? 'bg-green-100 text-green-700' :
                formStatus.type === 'error' ? 'bg-red-100 text-red-700' :
                'bg-green-100 text-green-700'
              }`}>
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
                    required
                  />
                  {formErrors.nombre && <p className="text-red-500 text-xs mt-1">{formErrors.nombre}</p>}
                </div>
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
                    required
                  />
                  {formErrors.apellido && <p className="text-red-500 text-xs mt-1">{formErrors.apellido}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 0981123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
                    required
                  />
                  {formErrors.telefono && <p className="text-red-500 text-xs mt-1">{formErrors.telefono}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje y Cargo</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
                  required
                ></textarea>
                {formErrors.mensaje && <p className="text-red-500 text-xs mt-1">{formErrors.mensaje}</p>}
              </div>
              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">Adjuntar CV (PDF, DOC, DOCX o JPEG)</label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.jpeg,.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
                />
                {formErrors.cv && <p className="text-red-500 text-xs mt-1">{formErrors.cv}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-customGreen text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  disabled={formStatus && formStatus.type === 'info'}
                >
                  {formStatus && formStatus.type === 'info' ? 'Enviando...' : 'Enviar Postulación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterAs />
    </div>
  );
}
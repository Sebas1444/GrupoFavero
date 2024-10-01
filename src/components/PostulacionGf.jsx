import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const navItems = [
  { name: "QUIÉNES SOMOS", href: "/#quienes-somos" },
  { name: "NUESTRAS EMPRESAS", href: "/#nuestras-empresas" },
  { name: "RSE", href: "/#rse" },
  { name: "CONTÁCTENOS", href: "/#contacto" },
  { name: "TRABAJA CON NOSOTROS", href: "/PostulacionGf" },
];

export default function PostulacionGf() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      navigate('/', { state: { scrollTo: sectionId } });
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
      <header className="bg-white shadow-md">
        <div className="bg-customBlue py-2">
          <div className="container mx-auto px-4">
            {/* Contenido de la barra superior */}
          </div>
        </div>
        <nav className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src='/img/GrupoFavero.png' alt="Grupo Favero Logo" className="h-12 w-auto" loading="eager" />
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-customBlue hover:text-blue-400 transition-colors font-semibold"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <button
              className="md:hidden text-customBlue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-customBlue hover:text-blue-400 transition-colors font-semibold"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow bg-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-customBlue mb-8 text-center">TRABAJA CON NOSOTROS</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-customBlue mb-4">Formulario de Postulación</h3>
            {formStatus && (
              <div className={`mb-4 p-4 rounded-md ${
                formStatus.type === 'success' ? 'bg-green-100 text-green-700' :
                formStatus.type === 'error' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
                />
                {formErrors.cv && <p className="text-red-500 text-xs mt-1">{formErrors.cv}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-customBlue text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={formStatus && formStatus.type === 'info'}
                >
                  {formStatus && formStatus.type === 'info' ? 'Enviando...' : 'Enviar Postulación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-customBlue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://www.facebook.com/grupofavero" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-transform duration-300 ease-in-out hover:scale-125">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/grupofaveropy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform duration-300 ease-in-out hover:scale-125">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@grupofavero5232" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-transform duration-300 ease-in-out hover:scale-125">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <p className="text-center md:text-left mb-4 md:mb-0">
              © 2024 Grupo Favero. Todos los derechos reservados.
            </p>
            <p className="text-sm">Diseñado por {"{ESCA}"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
import React, { useState } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Aquí iría la lógica para enviar el formulario
      console.log('Formulario enviado:', formData);
      alert('Formulario enviado con éxito');
      // Resetear el formulario
      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        mensaje: '',
        cv: null
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
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

      <main className="container mx-auto px-4 py-8 flex-grow" style={{ maxWidth: '2000px', maxHeight: '1200px', overflow: 'auto' }}>
        <h1 className="text-3xl font-bold text-customBlue mb-6">Trabaja con Nosotros</h1>
        <p className="text-gray-600 mb-4">
          Bienvenido a nuestra página de postulaciones. Aquí podrás encontrar información sobre nuestras ofertas de trabajo y cómo aplicar.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-customBlue mb-4">Formulario de Postulación</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customBlue focus:ring focus:ring-customBlue focus:ring-opacity-50"
                />
                {formErrors.nombre && <p className="text-red-500 text-xs mt-1">{formErrors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customBlue focus:ring focus:ring-customBlue focus:ring-opacity-50"
                />
                {formErrors.apellido && <p className="text-red-500 text-xs mt-1">{formErrors.apellido}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customBlue focus:ring focus:ring-customBlue focus:ring-opacity-50"
                />
                {formErrors.telefono && <p className="text-red-500 text-xs mt-1">{formErrors.telefono}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customBlue focus:ring focus:ring-customBlue focus:ring-opacity-50"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                value={formData.mensaje}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-customBlue focus:ring focus:ring-customBlue focus:ring-opacity-50"
              ></textarea>
              {formErrors.mensaje && <p className="text-red-500 text-xs mt-1">{formErrors.mensaje}</p>}
            </div>
            <div>
              <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Adjuntar CV (PDF, DOC, DOCX o JPEG)</label>
              <input
                type="file"
                id="cv"
                name="cv"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.jpeg,.jpg"
                className="mt-1 block w-full"
              />
              {formErrors.cv && <p className="text-red-500 text-xs mt-1">{formErrors.cv}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-customBlue text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-opacity-50"
              >
                Enviar Postulación
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-customBlue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://www.facebook.com/grupofavero" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/grupofaveropy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@grupofavero5232" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
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
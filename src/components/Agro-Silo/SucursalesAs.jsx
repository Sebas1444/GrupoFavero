import React, { useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
// import { sendContactForm } from '../assets/actions';

export default function SucursalesAs() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    mensaje: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'info', message: 'Enviando mensaje...' });
    try {
      const result = await sendContactForm(new FormData(e.target));
      if (result.success) {
        setFormStatus({ type: 'success', message: result.message });
        setFormData({ nombre: '', apellido: '', telefono: '', email: '', mensaje: '' });
      } else {
        setFormStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setFormStatus({ type: 'error', message: 'Error al enviar el mensaje' });
    }
  };

  return (
    <section id="contacto" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-customBlue mb-8 text-center">CONTÁCTENOS</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-customBlue mb-4">Dejanos tu opinión</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder="Ej: 0981123456"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
                    required
                  />
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
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-customBlue text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enviar
              </button>
            </form>
            {formStatus && (
              <div className={`mt-4 p-2 rounded ${formStatus.type === 'success' ? 'bg-green-100 text-green-800' :
                  formStatus.type === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                }`}>
                {formStatus.message}
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-customBlue mb-4">Datos de Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-customBlue mr-2" />
                <div>
                  <p className="font-semibold">Teléfono:</p>
                  <p>+595 21 645375</p>
                  <p>+595 21 645931</p>
                  <p>+595 21 646345</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-customBlue mr-2" />
                <div>
                  <p className="font-semibold">Horario:</p>
                  <p>Lun-Vie: 7:00 a 17:00 - Sab 08:00 a 11:00</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-customBlue mr-2" />
                <a href="mailto:info@grupofavero.com.py" className="text-customBlue hover:underline">
                  info@grupofavero.com.py
                </a>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-2">Ubicación</h4>
              <div className="aspect-w-16 aspect-h-9">
                <a href="https://www.google.com/maps/place/Grupo+Favero/@-25.252859,-57.5125293,18z/data=!4m6!3m5!1s0x945da59281b04449:0xa8602c4507e32aed!8m2!3d-25.2524524!4d-57.5128433!16s%2Fg%2F11dxf0xcs9?entry=ttu&g_ep=EgoyMDI0MDkyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1803.7881296026!2d-57.51252929999999!3d-25.252859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da59281b04449%3A0xa8602c4507e32aed!2sGrupo%20Favero!5e0!3m2!1ses!2spy!4v1625000000000!5m2!1ses!2spy"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
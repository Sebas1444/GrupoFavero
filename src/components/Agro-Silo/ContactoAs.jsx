import React, { useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
// import { sendContactForm } from '../assets/actions';

export default function ContactoAs() {
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
    <section id="contactoAs" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-customGreen mb-8 text-center">CONTÁCTENOS</h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-customGreen mb-4">Dejanos tu opinión</h3>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-customGreen text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
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
              <h3 className="text-xl font-semibold text-customGreen mb-4">Datos de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-customGreen mr-2 mt-1" />
                  <div>
                    <p className="font-semibold">Teléfono:</p>
                    <p>+595 21 645375</p>
                    <p>+595 21 645931</p>
                    <p>+595 21 646345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-customGreen mr-2 mt-1" />
                  <div>
                    <p className="font-semibold">Horario:</p>
                    <p>Lun-Vie: 7:00 a 17:00</p>
                    <p>Sab: 08:00 a 11:00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-customGreen mr-2 mt-1" />
                  <div>
                    <p className="font-semibold">Email:</p>
                    <a href="mailto:info@agrosilo.com.py" className="text-customGreen hover:underline">
                      info@agrosilo.com.py
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
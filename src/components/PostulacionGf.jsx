import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegar entre rutas utilizando React Router.
import HeaderGf from './HeaderGf'; // Componente personalizado para el encabezado.
import FooterGf from './FooterGf'; // Componente personalizado para el pie de página.

export default function PostulacionGf() {
  const navigate = useNavigate(); // Hook para manejar la navegación entre rutas en React Router.

  // Estado para almacenar los datos del formulario.
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    mensaje: '',
    cv: null // Almacena el archivo cargado por el usuario.
  });

  // Estado para manejar los errores de validación del formulario.
  const [formErrors, setFormErrors] = useState({});

  // Estado para manejar mensajes de éxito, error o estado de envío del formulario.
  const [formStatus, setFormStatus] = useState(null);

  // Estado y referencia para determinar dinámicamente la altura del encabezado.
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  // Efecto para calcular y actualizar la altura del encabezado en tiempo real.
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight(); // Actualiza al montar el componente.
    window.addEventListener('resize', updateHeaderHeight); // Se asegura de actualizar cuando la ventana cambia de tamaño.
    return () => window.removeEventListener('resize', updateHeaderHeight); // Limpia el evento cuando el componente se desmonta.
  }, []);

  // Función para manejar los clics de navegación en el encabezado.
  const handleNavClick = (href) => {
    navigate(href); // Redirige a la ruta especificada.
  };

  // Función para actualizar el estado del formulario cuando el usuario escribe en los campos.
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value // Si el campo es un archivo, guarda el archivo; de lo contrario, el texto ingresado.
    }));
  };

  // Función para validar los datos del formulario.
  const validateForm = () => {
    const errors = {}; // Objeto para almacenar mensajes de error.

    if (!formData.nombre.trim()) errors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) errors.apellido = "El apellido es requerido";
    if (!formData.telefono.trim()) errors.telefono = "El teléfono es requerido";
    else if (!/^\d{5,}$/.test(formData.telefono)) errors.telefono = "El teléfono debe contener al menos 5 números";
    if (!formData.email.trim()) errors.email = "El email es requerido";
    if (!formData.mensaje.trim()) errors.mensaje = "El mensaje es requerido";

    // Validación para archivos cargados.
    if (!formData.cv) {
      errors.cv = "El CV es requerido";
    } else {
      const allowedExtensions = ['pdf', 'doc', 'docx', 'jpeg', 'jpg'];
      const fileExtension = formData.cv.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        errors.cv = "El archivo debe ser PDF, DOC, DOCX o JPEG";
      }
    }

    return errors; // Devuelve los errores encontrados.
  };

  // Función para manejar el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene que la página se recargue al enviar el formulario.

    const errors = validateForm(); // Valida el formulario antes de enviarlo.
    if (Object.keys(errors).length === 0) {
      // Si no hay errores, muestra un mensaje de estado y envía los datos.
      setFormStatus({ type: 'info', message: 'Enviando postulación...' });
      try {
        const formDataToSend = new FormData(); // Crea un objeto FormData para manejar datos multipart/form.
        for (const key in formData) {
          formDataToSend.append(key, formData[key]); // Agrega cada campo del formulario.
        }

        // Envío de los datos al servidor usando Fetch API.
        const response = await fetch('/postulacion/send-postulacion', {
          method: 'POST',
          body: formDataToSend,
        });

        const result = await response.json(); // Procesa la respuesta del servidor.
        if (result.success) {
          // Si el envío fue exitoso, muestra un mensaje de éxito y reinicia el formulario.
          setFormStatus({ type: 'success', message: 'Postulación enviada con éxito' });
          setFormData({ nombre: '', apellido: '', telefono: '', email: '', mensaje: '', cv: null });
        } else {
          // Si hubo un error en el servidor, muestra el mensaje de error recibido.
          setFormStatus({ type: 'error', message: 'Error al enviar la postulación: ' + result.message });
        }
      } catch (error) {
        // Muestra un mensaje de error si ocurre un problema durante la solicitud.
        console.error('Error:', error);
        setFormStatus({ type: 'error', message: 'Error al enviar la postulación' });
      }
    } else {
      // Si hay errores de validación, los muestra y evita el envío.
      setFormErrors(errors);
      setFormStatus({ type: 'error', message: 'Por favor, corrija los errores en el formulario' });
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Componente de encabezado con referencia */}
      <HeaderGf ref={headerRef} onNavClick={handleNavClick} />
      
      {/* Contenedor principal del contenido */}
      <main className="flex-grow bg-gray-100" style={{ paddingTop: `${headerHeight}px` }}>
        {/* Sección central con contenedor para contenido */}
        <div className="container mx-auto px-4 max-w-6xl py-8">
          {/* Título principal de la sección */}
          <h2 className="text-3xl font-bold text-customBlue mb-8 text-center">TRABAJA CON NOSOTROS</h2>
          
          {/* Tarjeta con el formulario */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-xl font-semibold text-customBlue mb-4">
              ¡Forma parte de nuestro equipo de trabajo enviando tu CV!
            </p>
  
            {/* Muestra mensajes de estado del formulario si existen */}
            {formStatus && (
              <div
                className={`mb-4 p-4 rounded-md ${
                  formStatus.type === 'success' ? 'bg-green-100 text-green-700' :
                  formStatus.type === 'error' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}
              >
                {formStatus.message}
              </div>
            )}
  
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Grupo de campos: Nombre y Apellido */}
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
  
              {/* Grupo de campos: Teléfono y Email */}
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
  
              {/* Campo de texto para mensaje y cargo */}
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje y Cargo</label>
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
  
              {/* Campo para adjuntar CV */}
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
  
              {/* Botón para enviar el formulario */}
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
  
      {/* Componente de pie de página */}
      <FooterGf />
    </div>
  );
}  
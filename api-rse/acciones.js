import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Acciones = () => {
  const [acciones, setAcciones] = useState([]);
  const [nuevaAccion, setNuevaAccion] = useState({
    titulo: '',
    descripcion: '',
    descripcionDetallada: '',
    imagen: '',
    posicionImagen: { x: 50, y: 50 }
  });

  useEffect(() => {
    const accionesGuardadas = localStorage.getItem('acciones');
    if (accionesGuardadas) {
      setAcciones(JSON.parse(accionesGuardadas));
    }
  }, []);

  const guardarAcciones = (nuevasAcciones) => {
    localStorage.setItem('acciones', JSON.stringify(nuevasAcciones));
    setAcciones(nuevasAcciones);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaAccion(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaAccion(prev => ({ 
          ...prev, 
          imagen: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagePositionChange = (axis, value) => {
    setNuevaAccion(prev => ({
      ...prev,
      posicionImagen: {
        ...prev.posicionImagen,
        [axis]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaAccion.titulo && nuevaAccion.descripcion && nuevaAccion.descripcionDetallada && nuevaAccion.imagen) {
      const nuevasAcciones = [...acciones, { ...nuevaAccion, id: uuidv4() }];
      guardarAcciones(nuevasAcciones);
      setNuevaAccion({
        titulo: '',
        descripcion: '',
        descripcionDetallada: '',
        imagen: '',
        posicionImagen: { x: 50, y: 50 }
      });
    }
  };

  const handleDelete = (id) => {
    const nuevasAcciones = acciones.filter(accion => accion.id !== id);
    guardarAcciones(nuevasAcciones);
  };

  const handleEdit = (id) => {
    const accionAEditar = acciones.find(accion => accion.id === id);
    setNuevaAccion(accionAEditar);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Acciones RSE</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="titulo"
          value={nuevaAccion.titulo}
          onChange={handleInputChange}
          placeholder="Título"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="descripcion"
          value={nuevaAccion.descripcion}
          onChange={handleInputChange}
          placeholder="Descripción breve"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="descripcionDetallada"
          value={nuevaAccion.descripcionDetallada}
          onChange={handleInputChange}
          placeholder="Descripción detallada"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-2"
        />
        {nuevaAccion.imagen && (
          <div className="mb-2">
            <img src={nuevaAccion.imagen} alt="Preview" className="max-w-xs" />
          </div>
        )}
        <div className="mb-2">
          <label>Posición X de la imagen:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={nuevaAccion.posicionImagen.x}
            onChange={(e) => handleImagePositionChange('x', e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Posición Y de la imagen:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={nuevaAccion.posicionImagen.y}
            onChange={(e) => handleImagePositionChange('y', e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {nuevaAccion.id ? 'Actualizar Acción' : 'Agregar Acción'}
        </button>
      </form>
      <div>
        {acciones.map((accion) => (
          <div key={accion.id} className="border p-4 mb-4">
            <h3 className="font-bold">{accion.titulo}</h3>
            <p>{accion.descripcion}</p>
            <img src={accion.imagen} alt={accion.titulo} className="max-w-xs mt-2" />
            <div className="mt-2">
              <button onClick={() => handleEdit(accion.id)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                Editar
              </button>
              <button onClick={() => handleDelete(accion.id)} className="bg-red-500 text-white p-2 rounded">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acciones;
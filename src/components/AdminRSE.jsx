import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, Trash2, RefreshCw, Edit, X } from 'lucide-react';

const AdminRSE = () => {
  const [acciones, setAcciones] = useState([]);
  const [newAccion, setNewAccion] = useState({
    titulo: '',
    descripcion: '',
    descripcionDetallada: '',
    imagen: '',
    previewImage: '',
    posicionImagen: { x: 50, y: 50 }
  });
  const [syncMessage, setSyncMessage] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadAcciones();
  }, []);

  const loadAcciones = () => {
    const savedAcciones = localStorage.getItem('accionesRSE');
    if (savedAcciones) {
      setAcciones(JSON.parse(savedAcciones));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccion(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAccion(prev => ({ 
          ...prev, 
          imagen: reader.result,
          previewImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagePositionChange = (axis, value) => {
    setNewAccion(prev => ({
      ...prev,
      posicionImagen: {
        ...prev.posicionImagen,
        [axis]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAccion.titulo && newAccion.descripcion && newAccion.descripcionDetallada && newAccion.imagen) {
      setPreviewMode(true);
    }
  };

  const handleSave = () => {
    let updatedAcciones;
    if (editingIndex !== null) {
      updatedAcciones = [...acciones];
      updatedAcciones[editingIndex] = newAccion;
    } else {
      updatedAcciones = [...acciones, newAccion];
    }
    setAcciones(updatedAcciones);
    localStorage.setItem('accionesRSE', JSON.stringify(updatedAcciones));
    setNewAccion({ 
      titulo: '', 
      descripcion: '', 
      descripcionDetallada: '', 
      imagen: '',
      previewImage: '',
      posicionImagen: { x: 50, y: 50 }
    });
    setPreviewMode(false);
    setEditingIndex(null);
    setSyncMessage('Cambios guardados. No olvide sincronizar.');
  };

  const handleDelete = (index) => {
    const updatedAcciones = acciones.filter((_, i) => i !== index);
    setAcciones(updatedAcciones);
    localStorage.setItem('accionesRSE', JSON.stringify(updatedAcciones));
    setSyncMessage('Cambios guardados. No olvide sincronizar.');
  };

  const handleSync = () => {
    localStorage.setItem('accionesRSE', JSON.stringify(acciones));
    localStorage.setItem('lastSyncTime', new Date().toISOString());
    setSyncMessage('Sincronización completada.');
    setTimeout(() => setSyncMessage(''), 3000);
  };

  const handleEdit = (index) => {
    const accionToEdit = acciones[index];
    setNewAccion({
      ...accionToEdit,
      previewImage: accionToEdit.imagen
    });
    setEditingIndex(index);
    setPreviewMode(true);
  };

  const handleCancelEdit = () => {
    setNewAccion({ 
      titulo: '', 
      descripcion: '', 
      descripcionDetallada: '', 
      imagen: '',
      previewImage: '',
      posicionImagen: { x: 50, y: 50 }
    });
    setPreviewMode(false);
    setEditingIndex(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración RSE</h2>
      {!previewMode ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="titulo"
              value={newAccion.titulo}
              onChange={handleInputChange}
              placeholder="Título"
              className="border p-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 rounded"
            />
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-2">Previsualización de la imagen</h3>
              {newAccion.previewImage && (
                <div className="relative w-full h-64 mb-4 border rounded overflow-hidden">
                  <img 
                    src={newAccion.previewImage} 
                    alt="Previsualización" 
                    className="absolute w-full h-full object-cover"
                    style={{
                      objectPosition: `${newAccion.posicionImagen.x}% ${newAccion.posicionImagen.y}%`
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Posición horizontal de la imagen</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newAccion.posicionImagen.x}
                onChange={(e) => handleImagePositionChange('x', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Posición vertical de la imagen</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newAccion.posicionImagen.y}
                onChange={(e) => handleImagePositionChange('y', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <textarea
              name="descripcion"
              value={newAccion.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción breve"
              className="border p-2 rounded"
              rows="3"
            ></textarea>
            <textarea
              name="descripcionDetallada"
              value={newAccion.descripcionDetallada}
              onChange={handleInputChange}
              placeholder="Descripción detallada"
              className="border p-2 rounded md:col-span-2"
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded flex items-center">
            <PlusCircle className="mr-2" />
            {editingIndex !== null ? 'Actualizar Acción' : 'Agregar Acción'}
          </button>
        </form>
      ) : (
        <div className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{newAccion.titulo}</h3>
            <div className="relative w-full h-64 mb-4">
              <img 
                src={newAccion.imagen} 
                alt={newAccion.titulo} 
                className="absolute w-full h-full object-cover"
                style={{
                  objectPosition: `${newAccion.posicionImagen.x}% ${newAccion.posicionImagen.y}%`
                }}
              />
            </div>
            <p className="text-gray-600 mb-4">{newAccion.descripcion}</p>
            <p className="text-gray-800">{newAccion.descripcionDetallada}</p>
          </div>
          <div className="bg-gray-100 px-4 py-3 flex justify-end">
            <button onClick={handleCancelEdit} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Acciones Actuales</h3>
        <button onClick={handleSync} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <RefreshCw className="mr-2" />
          Sincronizar Cambios
        </button>
      </div>
      {syncMessage && <p className="text-green-600 mb-4">{syncMessage}</p>}
      <div>
        {acciones.map((accion, index) => (
          <div key={index} className="bg-white shadow rounded p-4 mb-4 flex justify-between items-start">
            <div>
              <h4 className="font-bold">{accion.titulo}</h4>
              <p className="text-sm text-gray-600">{accion.descripcion}</p>
              <p className="text-xs text-gray-500 mt-2">Descripción: {accion.descripcionDetallada.substring(0, 100)}...</p>
              <div className="relative w-32 h-32 mt-2">
                <img 
                  src={accion.imagen} 
                  alt={accion.titulo} 
                  className="absolute w-full h-full object-cover"
                  style={{
                    objectPosition: `${accion.posicionImagen.x}% ${accion.posicionImagen.y}%`
                  }}
                />
              </div>
            </div>
            <div>
              <button onClick={() => handleEdit(index)} className="text-blue-500 mr-2">
                <Edit />
              </button>
              <button onClick={() => handleDelete(index)} className="text-red-500">
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRSE;
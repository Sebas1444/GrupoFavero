import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Save, Trash2, RefreshCw, Edit, X } from 'lucide-react';
import axios from 'axios';

const AdminRSE = () => {
  const [acciones, setAcciones] = useState([]);
  const [newAccion, setNewAccion] = useState({
    titulo: '',
    descripcion: '',
    descripcionDetallada: '',
    imagen: '',
    posicionImagen: { x: 50, y: 50 },
    autor: '',
    fechaCreacion: '',
  });
  const [syncMessage, setSyncMessage] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    loadAcciones();
    const activityCheck = setInterval(() => {
      if (Date.now() - lastActivity > 120000) { // 2 minutos
        navigate('/admin/login');
      }
    }, 10000); // Verificar cada 10 segundos

    return () => clearInterval(activityCheck);
  }, [lastActivity, navigate]);

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const resetTimer = () => setLastActivity(Date.now());

    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);

  const loadAcciones = async () => {
    try {
      const response = await axios.get('/api-rse/Acciones');
      setAcciones(response.data);
    } catch (error) {
      console.error('Error al cargar acciones:', error);
      setSyncMessage('Error al cargar las acciones. Por favor, intente nuevamente.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccion(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post('/api-rse/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setNewAccion(prev => ({ 
          ...prev, 
          imagen: response.data.imageUrl
        }));
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        setSyncMessage('Error al subir la imagen. Por favor, intente nuevamente.');
      }
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

  const handleSave = async () => {
    try {
      const method = editingIndex !== null ? 'PUT' : 'POST';
      const url = editingIndex !== null ? `/api-rse/Acciones/${acciones[editingIndex]._id}` : '/api-rse/Acciones';
      
      const accionToSave = {
        ...newAccion,
        autor: 'Admin', // Reemplazar con el nombre real del usuario autenticado
        fechaCreacion: new Date().toISOString()
      };

      const response = await axios({
        method: method,
        url: url,
        data: accionToSave
      });

      if (response.status === 200 || response.status === 201) {
        await loadAcciones();
        setNewAccion({ 
          titulo: '', 
          descripcion: '', 
          descripcionDetallada: '', 
          imagen: '',
          posicionImagen: { x: 50, y: 50 },
          autor: '',
          fechaCreacion: ''
        });
        setPreviewMode(false);
        setEditingIndex(null);
        setSyncMessage('Cambios guardados y sincronizados.');
      } else {
        setSyncMessage('Error al guardar los cambios.');
      }
    } catch (error) {
      console.error('Error al guardar acción:', error);
      setSyncMessage('Error al guardar los cambios.');
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`/api-rse/Acciones/${acciones[index]._id}`);

      if (response.status === 200) {
        await loadAcciones();
        setSyncMessage('Acción eliminada y sincronizada.');
      } else {
        setSyncMessage('Error al eliminar la acción.');
      }
    } catch (error) {
      console.error('Error al eliminar acción:', error);
      setSyncMessage('Error al eliminar la acción.');
    }
  };

  const handleEdit = (index) => {
    setNewAccion({...acciones[index]});
    setEditingIndex(index);
    setPreviewMode(true);
  };

  const handleCancelEdit = () => {
    setNewAccion({ 
      titulo: '', 
      descripcion: '', 
      descripcionDetallada: '', 
      imagen: '',
      posicionImagen: { x: 50, y: 50 },
      autor: '',
      fechaCreacion: ''
    });
    setPreviewMode(false);
    setEditingIndex(null);
  };

  const handleSync = async () => {
    try {
      await loadAcciones();
      setSyncMessage('Sincronización completada con éxito.');
    } catch (error) {
      console.error('Error al sincronizar:', error);
      setSyncMessage('Error al sincronizar. Por favor, intente nuevamente.');
    }
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
              {newAccion.imagen && (
                <div className="relative w-full h-64 mb-4 border rounded overflow-hidden">
                  <img 
                    src={newAccion.imagen} 
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
        <button onClick={handleSync} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <RefreshCw className="mr-2" />
          Sincronizar
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
              <p className="text-xs text-gray-500 mt-2">Autor: {accion.autor}</p>
              <p className="text-xs text-gray-500">Fecha: {new Date(accion.fechaCreacion).toLocaleString()}</p>
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
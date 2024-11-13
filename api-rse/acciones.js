import express from 'express';
import Accion from '../api/models/Accion.js';

const router = express.Router();

// Obtener todas las acciones
router.get('/', async (req, res) => {
  try {
    const acciones = await Accion.find();
    res.json(acciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las acciones' });
  }
});

// Crear una nueva acción
router.post('/', async (req, res) => {
  try {
    const nuevaAccion = new Accion(req.body);
    await nuevaAccion.save();
    res.status(201).json(nuevaAccion);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la acción' });
  }
});

// Actualizar una acción
router.put('/:id', async (req, res) => {
  try {
    const accion = await Accion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!accion) {
      return res.status(404).json({ message: 'Acción no encontrada' });
    }
    res.json(accion);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la acción' });
  }
});

// Eliminar una acción
router.delete('/:id', async (req, res) => {
  try {
    const accion = await Accion.findByIdAndDelete(req.params.id);
    if (!accion) {
      return res.status(404).json({ message: 'Acción no encontrada' });
    }
    res.json({ message: 'Acción eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la acción' });
  }
});

export default router;
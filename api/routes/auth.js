import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Aquí podrías generar un JWT para autenticación y enviarlo en la respuesta
    // Ejemplo:
    // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;

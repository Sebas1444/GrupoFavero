import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import accionesRoutes from './api/routes/acciones.js';
import authRoutes from './api/routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/acciones', accionesRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Main server running on port ${PORT}`);
});
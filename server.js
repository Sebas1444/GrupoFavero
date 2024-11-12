import express from 'express';
import cors from 'cors';
import { connectDB } from './api/connectDB.js';
import accionesRoutes from './api/routes/acciones.js';
import authRoutes from './api/routes/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/acciones', accionesRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Main server running on port ${PORT}`);
});
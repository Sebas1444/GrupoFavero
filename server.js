import express from 'express';
import cors from 'cors';
import { connectDB } from './server/connectDB.js';
import accionesRoutes from './api-rse/acciones.js';
import authRoutes from './api/routes/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api-rse/acciones', accionesRoutes);
app.use('/api/routes/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`RSE server running on port ${PORT}`);
});
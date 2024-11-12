import mongoose from 'mongoose';

const accionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  descripcionDetallada: { type: String, required: true },
  imagen: { type: String, required: true },
  posicionImagen: {
    x: { type: Number, default: 50 },
    y: { type: Number, default: 50 }
  }
});

const Accion = mongoose.model('Accion', accionSchema);

export default Accion;
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Sebas:..S.3.b.a.s.1.4.1.6..@gfteste.pknao.mongodb.net/gfdb?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conexión exitosa a MongoDB');
    
    // Listar las colecciones en la base de datos
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Colecciones en la base de datos:');
    collections.forEach(collection => {
      console.log(collection.name);
    });

  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  } finally {
    await mongoose.disconnect();
  }
}

connectDB();
import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js"; // Importa con la extensión .js

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Escucha eventos de conexión y desconexión
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected");
});

// Llama a la función para iniciar la conexión
connectDB();

export default connectDB;

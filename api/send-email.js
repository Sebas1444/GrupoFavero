import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

export async function sendMail({ to, subject, text }) {
  console.log('Attempting to create transporter...');
  const transporter = nodemailer.createTransport({
    host: 'mail.agrosilo.com.py',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // No fallar en certificados inválidos
      rejectUnauthorized: false
    }
  });

  console.log('Transporter created, attempting to send mail...');
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log('Correo enviado con éxito. ID del mensaje:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error detallado al enviar correo:', error);
    throw new Error(`Error al enviar el correo: ${error.message}`);
  }
}

// Función de prueba para verificar la configuración
export async function testEmailConfig() {
  try {
    console.log('Iniciando prueba de configuración de correo...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '******' : 'No configurado');

    await sendMail({
      to: process.env.EMAIL_USER, // Enviar a sí mismo como prueba
      subject: 'Prueba de configuración de correo',
      text: 'Si recibes este correo, la configuración es correcta.'
    });

    console.log('Prueba completada con éxito. Revisa tu bandeja de entrada.');
  } catch (error) {
    console.error('La prueba falló:', error.message);
  }
}


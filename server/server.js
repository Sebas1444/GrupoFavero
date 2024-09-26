import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

async function sendMail({ to, subject, text }) {
  console.log('Attempting to create transporter...');
  const transporter = nodemailer.createTransport({
    host: 'mail.agrosilo.com.py',
    port: 995, // Puerto para SSL/TLS
    secure: true, // Usar SSL/TLS
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
    console.log('Mail sent successfully. Message ID:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending mail:', error);
    throw error;
  }
}

app.post('/api/send-email', async (req, res) => {
  console.log('Received request:', req.body);

  const { nombre, apellido, telefono, email, mensaje } = req.body;

  const emailContent = `
    Nuevo mensaje de contacto:
    Nombre: ${nombre} ${apellido}
    Teléfono: ${telefono}
    Email: ${email}
    Mensaje: ${mensaje}
  `;

  try {
    const info = await sendMail({
      to: 'sebastian.aguayo@agrosilo.com.py',
      subject: 'Nuevo mensaje de contacto - Grupo Favero',
      text: emailContent,
    });
    console.log('Email sent successfully');
    res.json({ success: true, message: 'Mensaje enviado con éxito', messageId: info.messageId });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '******' : 'Not set');
});
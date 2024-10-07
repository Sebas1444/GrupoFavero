import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

export async function sendPostulacionMail({ nombre, apellido, telefono, email, mensaje, cvFile }) {
  const transporter = nodemailer.createTransport({
    host: 'mail.agrosilo.com.py',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'testpagweb24@gmail.com', //Para quien
    subject: 'Nueva postulación recibida',
    text: `
      Nombre: ${nombre} ${apellido}
      Teléfono: ${telefono}
      Email: ${email}
      Mensaje: ${mensaje}
    `,
    attachments: [
      {
        filename: cvFile.originalname,
        path: cvFile.path
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de postulación enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el email de postulación:', error);
    throw error;
  }
}
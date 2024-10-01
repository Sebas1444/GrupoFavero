import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

async function sendPostulacionMail({ nombre, apellido, telefono, email, mensaje, cvFile }) {
  console.log('Attempting to create transporter for postulacion...');
  const transporter = nodemailer.createTransport({
    host: 'mail.agrosilo.com.py',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  console.log('Transporter created, attempting to send postulacion mail...');
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'rrhhtebusca@gmail.com',
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
    });
    console.log('Postulacion mail sent successfully. Message ID:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending postulacion mail:', error);
    throw error;
  }
}

app.post('/api/send-postulacion', upload.single('cv'), async (req, res) => {
  console.log('Received postulacion request:', req.body);

  const { nombre, apellido, telefono, email, mensaje } = req.body;
  const cvFile = req.file;

  if (!nombre || !apellido || !telefono || !email || !mensaje || !cvFile) {
    return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
  }

  try {
    const info = await sendPostulacionMail({ nombre, apellido, telefono, email, mensaje, cvFile });
    console.log('Postulacion email sent successfully');
    res.json({ success: true, message: 'Postulación enviada con éxito', messageId: info.messageId });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ success: false, message: 'Error al enviar la postulación', error: error.message });
  }
});

const PORT = process.env.POSTULACION_PORT || 3050;
app.listen(PORT, () => {
  console.log(`Servidor de postulación corriendo en http://localhost:${PORT}`);
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '******' : 'Not set');
});
import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  console.log('Handling request:', req.method);
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const database = client.db('gfdb');
    const acciones = database.collection('acciones');

    switch (req.method) {
      case 'GET':
        console.log('Executing GET request');
        const result = await acciones.find({}).toArray();
        res.status(200).json(result);
        break;
      case 'POST':
        console.log('Executing POST request');
        const newAccion = req.body;
        const insertResult = await acciones.insertOne(newAccion);
        res.status(201).json(insertResult);
        break;
      case 'PUT':
        console.log('Executing PUT request');
        const { id } = req.query;
        const updatedAccion = req.body;
        const updateResult = await acciones.updateOne({ _id: id }, { $set: updatedAccion });
        res.status(200).json(updateResult);
        break;
      case 'DELETE':
        console.log('Executing DELETE request');
        const { id: deleteId } = req.query;
        const deleteResult = await acciones.deleteOne({ _id: deleteId });
        res.status(200).json(deleteResult);
        break;
      default:
        console.log('Method not allowed:', req.method);
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
    console.log('Closed MongoDB connection');
  }
}
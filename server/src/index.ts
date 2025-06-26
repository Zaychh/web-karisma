import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://karismaacademy.vercel.app'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
import { Router, Request, Response } from 'express';
import { db } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/authMiddleware';

const router = Router();

// [POST] Register
router.post('/Register', async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const [check] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if ((check as any[]).length > 0) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'user']
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user', detail: err });
  }
});

// [POST] Login
router.post('/Login', async (req: Request, res: Response) => {
  const { identifier, email, password } = req.body;
  const loginField = identifier || email;
  console.log('Login attempt:', req.body);

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? OR name = ?', [loginField, loginField]);
    const user = (rows as any[])[0];

    if (!user) {
      res.status(401).json({ error: 'User not found 🙁' });
      return;
    }

    console.log('User found:', user.email);
    console.log('Password:', password);
    console.log('Hashed Password:', user.password);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'karisma123rahasia',
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login berhasil', token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login', detail: err });
  }
});

router.get('/profile', verifyToken, (req: any, res: Response) => {
  res.json({ message: 'Profil berhasil diakses', user: req.user });
  return;
});

router.get('/admin', verifyToken, checkRole('admin'), (req: any, res: Response) => {
  res.json({ message: 'Admin berhasil diakses', user: req.user });
  return;
});

export default router;
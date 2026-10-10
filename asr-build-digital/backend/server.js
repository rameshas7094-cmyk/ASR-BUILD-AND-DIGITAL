import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();
const app = express();
const port = Number(process.env.PORT || 5000);

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(s => s.trim()) : 'http://localhost:5173'
}));
app.use(express.json({ limit: '20kb' }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'unavailable' });
  }
});

app.post('/api/enquiries', async (req, res) => {
  const { name, email, phone = '', division, service = '', message } = req.body || {};
  const clean = value => typeof value === 'string' ? value.trim() : '';
  const values = {
    name: clean(name), email: clean(email), phone: clean(phone),
    division: clean(division), service: clean(service), message: clean(message)
  };

  if (values.name.length < 2 || values.name.length > 120) {
    return res.status(400).json({ message: 'Please enter a name between 2 and 120 characters.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }
  if (values.phone.length > 40 || values.service.length > 120) {
    return res.status(400).json({ message: 'One of the fields is too long.' });
  }
  if (!['Digital Solutions', 'Property & Construction'].includes(values.division)) {
    return res.status(400).json({ message: 'Please choose a valid service division.' });
  }
  if (values.message.length < 10 || values.message.length > 4000) {
    return res.status(400).json({ message: 'Please enter a message between 10 and 4000 characters.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO enquiries (name, email, phone, division, service, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [values.name, values.email, values.phone, values.division, values.service, values.message]
    );
    res.status(201).json({
      message: 'Enquiry received successfully.',
      enquiryId: result.rows[0].id,
      createdAt: result.rows[0].created_at
    });
  } catch (error) {
    console.error('Failed to save enquiry:', error.message);
    res.status(500).json({ message: 'Unable to save your enquiry right now. Please try again later.' });
  }
});

app.use((_req, res) => res.status(404).json({ message: 'Route not found.' }));
app.listen(port, () => console.log(`ASR Build & Digital API running on http://localhost:${port}`));

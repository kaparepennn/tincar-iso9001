// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { authenticateToken } = require('../authMiddleware');
const JWT_SECRET = process.env.JWT_SECRET || 'tincar_dev_secret';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username y password son requeridos' });
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });
  const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin } });
});

router.get('/me', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ['id', 'username', 'firstName', 'lastName', 'isAdmin'] });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

module.exports = router;

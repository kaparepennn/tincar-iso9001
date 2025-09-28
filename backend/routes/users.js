// backend/routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { authenticateToken, requireAdmin } = require('../authMiddleware');

router.use(authenticateToken);

// Obtener lista de usuarios (solo admin)
router.get('/', requireAdmin, async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'username', 'firstName', 'lastName', 'isAdmin'] });
  res.json(users);
});

// Crear usuario (solo admin)
router.post('/', requireAdmin, async (req, res) => {
  const { username, firstName, lastName, password, isAdmin } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username y password son requeridos' });
  const existing = await User.findOne({ where: { username } });
  if (existing) return res.status(400).json({ message: 'Usuario ya existe' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, firstName, lastName, passwordHash: hash, isAdmin: !!isAdmin });
  res.json({ id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin });
});

// Actualizar usuario (solo admin)
router.put('/:id', requireAdmin, async (req, res) => {
  const { firstName, lastName, isAdmin, password } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  if (password) user.passwordHash = await bcrypt.hash(password, 10);
  if (firstName !== undefined) user.firstName = firstName;
  if (lastName !== undefined) user.lastName = lastName;
  if (isAdmin !== undefined) user.isAdmin = !!isAdmin;
  await user.save();
  res.json({ id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin });
});

// Eliminar usuario (solo admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  await user.destroy();
  res.json({ message: 'Usuario eliminado' });
});

module.exports = router;

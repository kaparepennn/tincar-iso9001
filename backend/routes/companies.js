// backend/routes/companies.js
const express = require('express');
const router = express.Router();
const { Company, User } = require('../models');
const { authenticateToken } = require('../authMiddleware');

router.use(authenticateToken);

// listar todas las empresas
router.get('/', async (req, res) => {
  const companies = await Company.findAll({ include: [{ model: User, attributes: ['id', 'username', 'firstName', 'lastName'] }] });
  res.json(companies);
});

// crear empresa (se asocia al usuario que crea por defecto)
router.post('/', async (req, res) => {
  const data = req.body;
  data.userId = data.userId || req.user.id;
  const company = await Company.create(data);
  res.json(company);
});

// actualizar empresa (solo owner o admin)
router.put('/:id', async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company) return res.status(404).json({ message: 'Empresa no encontrada' });
  if (company.userId !== req.user.id && !req.user.isAdmin) return res.status(403).json({ message: 'No autorizado' });
  await company.update(req.body);
  res.json(company);
});

// eliminar empresa (solo owner o admin)
router.delete('/:id', async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company) return res.status(404).json({ message: 'Empresa no encontrada' });
  if (company.userId !== req.user.id && !req.user.isAdmin) return res.status(403).json({ message: 'No autorizado' });
  await company.destroy();
  res.json({ message: 'Empresa eliminada' });
});

module.exports = router;

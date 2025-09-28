// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const companiesRoutes = require('./routes/companies');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/companies', companiesRoutes);

// root
app.get('/', (req, res) => res.json({ message: 'TinCar backend corriendo' }));

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Backend corriendo en puerto', PORT));
});

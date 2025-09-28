// backend/seed.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User } = require('./models');

async function seed() {
  await sequelize.sync();
  const users = [
    { username: 'edgar.mojica', firstName: 'Edgar', lastName: 'Mojica' },
    { username: 'karen.palacios', firstName: 'Karen', lastName: 'Palacios' },
    { username: 'cristian.rincon', firstName: 'Cristian', lastName: 'Rincon' },
    { username: 'diego.hernandez', firstName: 'Diego', lastName: 'Hernandez' },
    { username: 'santiago.becerra', firstName: 'Santiago', lastName: 'Becerra' }
  ];

  const defaultPass = 'tincar123';
  for (const u of users) {
    const [user, created] = await User.findOrCreate({
      where: { username: u.username },
      defaults: {
        firstName: u.firstName,
        lastName: u.lastName,
        passwordHash: await bcrypt.hash(defaultPass, 10),
        isAdmin: true
      }
    });
    if (created) console.log('Usuario creado:', u.username);
  }
  console.log('Seed finalizado. Usuarios creados con contraseña:', defaultPass);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });

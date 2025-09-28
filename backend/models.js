// backend/models.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(dataDir, 'database.sqlite'),
  logging: false,
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  passwordHash: { type: DataTypes.STRING },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Company = sequelize.define('Company', {
  businessName: { type: DataTypes.STRING, allowNull: false },
  companyNumber: { type: DataTypes.STRING },
  nit: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  legalRepresentative: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
  economicSector: { type: DataTypes.STRING },
  companyType: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  socialNetworks: { type: DataTypes.JSON }
});

User.hasMany(Company, { foreignKey: 'userId' });
Company.belongsTo(User, { as: 'owner', foreignKey: 'userId' });

module.exports = { sequelize, User, Company };

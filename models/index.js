const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);
db.Plano = require('./plano')(sequelize, Sequelize.DataTypes);
db.Tarefa = require('./tarefa')(sequelize, Sequelize.DataTypes);

// Relacionamentos
db.Usuario.hasMany(db.Plano);
db.Plano.belongsTo(db.Usuario);

db.Plano.hasMany(db.Tarefa, { onDelete: 'CASCADE' });
db.Tarefa.belongsTo(db.Plano);

module.exports = db;

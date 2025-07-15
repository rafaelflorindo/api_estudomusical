// models/plano.js
module.exports = (sequelize, DataTypes) => {
    const Plano = sequelize.define('Plano', {
      nome: DataTypes.STRING,
      diaSemana: DataTypes.STRING  // Novo campo
    });
    Plano.associate = (models) => {
      Plano.belongsTo(models.Usuario);
      Plano.hasMany(models.Tarefa, { onDelete: 'CASCADE' });
    };
    return Plano;
  };
  
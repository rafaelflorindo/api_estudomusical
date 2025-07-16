// models/tarefa.js
module.exports = (sequelize, DataTypes) => {
    const Tarefa = sequelize.define('Tarefa', {
      descricao: DataTypes.STRING,
      concluida: { type: DataTypes.BOOLEAN, defaultValue: false },
      planoId: DataTypes.INTEGER
    });
    Tarefa.associate = (models) => {
      Tarefa.belongsTo(models.Plano);
    };
    return Tarefa;
  };
  
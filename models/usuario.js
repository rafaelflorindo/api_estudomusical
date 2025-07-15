// models/usuario.js
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      nome: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      senha: DataTypes.STRING
    });
    return Usuario;
  };
  
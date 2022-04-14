const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, primaryKey: true },
    sourceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: { type: DataTypes.STRING ,allowNull: false},
    score: { type: DataTypes.FLOAT},
    healtScore: { type: DataTypes.FLOAT },
    instructions: { type: DataTypes.STRING }
  });
};

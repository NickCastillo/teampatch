module.exports = (sequelize, DataTypes) => {
  const deporte = sequelize.define('deporte', {
    nombre: { 
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true, 
        
      },
    },
  }, {});

  deporte.associate = function associate(models) {
    deporte.hasMany(models.equipo);
  };

  return deporte;
};

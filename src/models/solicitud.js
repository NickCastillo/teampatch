module.exports = (sequelize, DataTypes) => {
  const solicitud = sequelize.define('solicitud', {
    estado: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true, 
      },
    },
    userId: {    // User al que pertenece la solicitud (el que la mandó)
      type: DataTypes.INTEGER,
    },
    equipoId: {    // equipo al que pertenece la solicitud (el que le llego)
      type: DataTypes.INTEGER,
    },
    
  }, {});

  solicitud.associate = function associate(models) {
    solicitud.belongsTo(models.user);
    solicitud.belongsTo(models.equipo);
  };

  return solicitud;
};

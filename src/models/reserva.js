module.exports = (sequelize, DataTypes) => {
  const reserva = sequelize.define('reserva', {
    estado: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
    fecha: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true, 
      },
    },
    hora: {    // User al que pertenece la solicitud (el que la mandó)
      type: DataTypes.INTEGER,
    },
    equipoId: {    // User al que pertenece la solicitud (el que la mandó)
      type: DataTypes.INTEGER,
    },
    canchaId: {    // equipo al que pertenece la solicitud (el que le llego)
      type: DataTypes.INTEGER,
    },
    
  }, {});

  reserva.associate = function associate(models) {
    reserva.belongsTo(models.cancha);
    reserva.belongsTo(models.equipo);
  };

  return reserva;
};

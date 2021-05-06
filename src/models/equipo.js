module.exports = (sequelize, DataTypes) => {
  const equipo = sequelize.define('equipo', {
    nombre: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true, 
      },
    },
    capitan: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
        isInt: true, 
      },
    },
    horarios: {
      type: DataTypes.TEXT,
    },
    foto: {
      type: DataTypes.TEXT
    },
    deporteId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
        isInt: true, 
        
      },
    },
  }, {});

  equipo.associate = function associate(models) {
    equipo.belongsTo(models.deporte);
    equipo.hasMany(models.solicitud);
    equipo.hasMany(models.reserva);
  };

  return equipo;
};

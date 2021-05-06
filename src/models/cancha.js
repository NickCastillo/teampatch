module.exports = (sequelize, DataTypes) => {
  const cancha = sequelize.define('cancha', {
    largo: {
      type: DataTypes.FLOAT,
      allownull: false,
      min: 0,
      isInt: true,
      validate: {
        notEmpty: true
      }
    },
    ancho: {
      type: DataTypes.FLOAT,
      allownull: false,
      min: 0,
      isInt: true,
      validate: {
        notEmpty: true
      }
    },
    precio: {
      type: DataTypes.INTEGER,
      allownull: false,
      min: 0,
      isInt: true,
      validate: {
        notEmpty: true
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allownull: false,
      
      validate: {
        notEmpty: true
      }
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allownull: false,
    
      validate: {
        notEmpty: true
      }
    },
    foto: {
      type: DataTypes.TEXT,
    },
    recintoDeportivoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recinto_deportivos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },);

  cancha.associate = function associate(models) {
    cancha.belongsTo(models.recinto_deportivo);
    cancha.hasMany(models.reserva);
  };

  return cancha;
};

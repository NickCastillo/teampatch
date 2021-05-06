module.exports = (sequelize, DataTypes) => {
  const partido = sequelize.define('partido', {
    fecha: {
      type: DataTypes.DATE,
      isDate: true,
    },
    hora: {
      type: DataTypes.TIME,
    },
    resultado: {
      type: DataTypes.INTEGER,
      isInt: true, 
    },
    recintoDeportivoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recinto_deportivos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  partido.associate = function associate(models) {
    partido.belongsTo(models.recinto_deportivo);
    
  };

  return partido;
};

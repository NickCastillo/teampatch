module.exports = (sequelize, DataTypes) => {
  const comentario = sequelize.define('comentario', {
    contenido: {
      type: DataTypes.TEXT,
      allownull: false,
      notEmpty: true,
      validate: {
        notEmpty: true
      }
    },
    timestamp: {
      type: DataTypes.DATE,
    },
    recintoDeportivoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recinto_deportivos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  comentario.associate = function associate(models) {
    comentario.belongsTo(models.recinto_deportivo);
    comentario.belongsTo(models.user);
  };

  return comentario;
};

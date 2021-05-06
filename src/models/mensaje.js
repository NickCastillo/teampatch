module.exports = (sequelize, DataTypes) => {
  const mensaje = sequelize.define('mensaje', {
    contenido: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, {});

  mensaje.associate = function associate(models) {
    mensaje.belongsTo(models.user);
  };

  return mensaje;
};

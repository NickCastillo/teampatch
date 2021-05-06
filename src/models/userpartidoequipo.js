module.exports = (sequelize, DataTypes) => {
    const   userpartidoequipo = sequelize.define('userpartidoequipo', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      equipopartidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      });

    userpartidoequipo.associate = function associate(models) {
    
    
    models.user.belongsToMany(models.equipopartido, { through: userpartidoequipo });
    models.equipopartido.belongsToMany(models.user, { through: userpartidoequipo });
    userpartidoequipo.belongsTo(models.user);
    userpartidoequipo.belongsTo(models.equipopartido);
    models.user.hasMany(userpartidoequipo);
    models.equipopartido.hasMany(userpartidoequipo);
    
  };

  return userpartidoequipo;
};
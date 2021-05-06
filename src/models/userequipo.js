module.exports = (sequelize, DataTypes) => {
    const userequipo = sequelize.define('userequipo', {
        equipoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
      });

      userequipo.associate = function associate(models) {

    models.equipo.belongsToMany(models.user, { through: userequipo });
    models.user.belongsToMany(models.equipo, { through: userequipo });
    userequipo.belongsTo(models.user);
    userequipo.belongsTo(models.equipo);
    models.user.hasMany(userequipo);
    models.equipo.hasMany(userequipo);
  };

  return userequipo;
};

module.exports = (sequelize, DataTypes) => {
    const equipopartido = sequelize.define('equipopartido', {
        equipoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          partidoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
      });

      equipopartido.associate = function associate(models) {
    
    //N a N
    models.equipo.belongsToMany(models.partido, { through: equipopartido });
    models.partido.belongsToMany(models.equipo, { through: equipopartido });
    equipopartido.belongsTo(models.partido);
    equipopartido.belongsTo(models.equipo);
    models.partido.hasMany(equipopartido);
    models.equipo.hasMany(equipopartido);
  };

  return equipopartido;
};

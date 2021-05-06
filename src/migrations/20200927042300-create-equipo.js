module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('equipos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    nombre: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    capitan: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    horarios: {
      type: Sequelize.TEXT,
    },
    foto: {
      type: Sequelize.TEXT,
    },
    deporteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references:  {
        model: "deportes",
        key: "id",
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('equipos'),
};

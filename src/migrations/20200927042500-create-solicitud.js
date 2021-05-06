module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('solicituds', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    estado: {
      type: Sequelize.INTEGER,
    },
    descripcion: {
      type: Sequelize.TEXT,
    },

    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    equipoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'equipos',
        key: 'id',
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

  down: (queryInterface) => queryInterface.dropTable('solicituds'),
};

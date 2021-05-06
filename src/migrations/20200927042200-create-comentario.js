module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comentarios', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    contenido: {
      type: Sequelize.TEXT,
    },
    timestamp: {
      type: Sequelize.DATE,
    },
    recintoDeportivoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'recinto_deportivos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
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

  down: (queryInterface) => queryInterface.dropTable('comentarios'),
};

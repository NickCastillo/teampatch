module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('partidos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    fecha: {
      type: Sequelize.DATE,
    },
    hora: {
      type: Sequelize.TIME,
    },
    resultado: {
      type: Sequelize.INTEGER,
    },
    recintoDeportivoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'recinto_deportivos',
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

  down: (queryInterface) => queryInterface.dropTable('partidos'),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('canchas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    largo: {
      type: Sequelize.FLOAT,
    },
    ancho: {
      type: Sequelize.FLOAT,
    },
    precio: {
      type: Sequelize.INTEGER,
    },
    descripcion: {
      type: Sequelize.TEXT,
    },
    disponible: {
      type: Sequelize.BOOLEAN,
    },
    foto: {
      type: Sequelize.TEXT,
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

  down: (queryInterface) => queryInterface.dropTable('canchas'),
};

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('userpartidoequipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      equipopartidoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'equipopartidos',
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
  
    down: (queryInterface) => queryInterface.dropTable('userpartidoequipos'),
  };
  
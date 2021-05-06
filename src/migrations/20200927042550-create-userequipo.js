module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('userequipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      equipoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'equipos',
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
  
    down: (queryInterface) => queryInterface.dropTable('userequipos'),
  };
  
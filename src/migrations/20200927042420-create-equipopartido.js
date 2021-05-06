module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('equipopartidos', {
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
      partidoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'partidos',
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
  
    down: (queryInterface) => queryInterface.dropTable('equipopartidos'),
  };
  
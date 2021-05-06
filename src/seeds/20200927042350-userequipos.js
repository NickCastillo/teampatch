'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const usersArray = [];

    usersArray.push({
      equipoId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    usersArray.push({
      equipoId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    usersArray.push({
      equipoId: 1,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      equipoId: 2,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    usersArray.push({
      equipoId: 2,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      equipoId: 3,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    usersArray.push({
      equipoId: 3,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    usersArray.push({
      equipoId: 3,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    usersArray.push({
      equipoId: 3,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      equipoId: 4,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    usersArray.push({
      equipoId: 4,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    usersArray.push({
      equipoId: 4,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('userequipos', usersArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

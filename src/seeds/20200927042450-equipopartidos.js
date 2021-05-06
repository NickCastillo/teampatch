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
      partidoId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
        equipoId: 2,
        partidoId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    
      usersArray.push({
        equipoId: 3,
        partidoId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      usersArray.push({
        equipoId: 4,
        partidoId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    return queryInterface.bulkInsert('equipopartidos', usersArray);
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

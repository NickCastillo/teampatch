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
   const deportesArray = [];

   deportesArray.push({
    nombre: "Voleibol",
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   deportesArray.push({
    nombre: "Futbol",
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   deportesArray.push({
    nombre: "Basquetbol",
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   deportesArray.push({
    nombre: "Rugby",
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   deportesArray.push({
    nombre: "Tenis",
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   deportesArray.push({
    nombre: "Ping Pong",
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   deportesArray.push({
    nombre: "Otro",
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   return queryInterface.bulkInsert('deportes', deportesArray);

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

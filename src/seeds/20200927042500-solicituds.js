'use strict';

const solicitud = require("../models/solicitud");

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
  // const USER_CORREO = 'civargas5@uc.cl'
  //  const SOLICITUDS_QUANTITY = 2;

  //  const us = await queryInterface.sequelize.query(
  //   `SELECT id FROM users WHERE correo='${USER_CORREO}'`
  // );
  // const { id:userId } = us[0][0]
  // const solicitudData = [];
  // for (let i = 0; i < SOLICITUDS_QUANTITY; i += 1) {
  //   solicitudData.push({
  //     userId,
  //     estado: 0,
  //     equipoId: 1,
  //     descripcion: "solicitud",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  // }
  //return queryInterface.bulkInsert('solicituds', solicitudData);
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

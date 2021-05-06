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

  const RECINTODEPORTIVO_NOMBRE = 'Xsoccer'
  const CANTIDAD_PARTIDOS = 2
  const recintos = await queryInterface.sequelize.query(
   `SELECT id FROM recinto_deportivos WHERE nombre='${RECINTODEPORTIVO_NOMBRE}'`
  )
  const { id: recintoDeportivoId} = recintos[0][0];
  const partidosArray = []
  const resultados = [1, 2]
  const horas = ['17:30:00', '19:00:00']
  const fechas = ['2020-09-28', '2020-08-18']
  for (let i = 0; i<CANTIDAD_PARTIDOS; i+=1){
    partidosArray.push({
      recintoDeportivoId,
      resultado: resultados[i],
      hora: horas[i],
      fecha: fechas[i],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  const RECINTODEPORTIVO_NOMBRE2 = 'Deportes UC'
  const CANTIDAD_PARTIDOS2 = 4
  const recintos2 = await queryInterface.sequelize.query(
   `SELECT id FROM recinto_deportivos WHERE nombre='${RECINTODEPORTIVO_NOMBRE2}'`
  )
  const { id: recintoDeportivoId2} = recintos2[0][0];
  const partidosArray2 = []
  const resultados2 = [1, 2]
  const horas2 = ['17:00:00', '19:30:00', '12:30:00', '13:45:00']
  const fechas2 = ['2020-11-24', '2020-11-26', '2020-10-04', '2020-11-20']
  for (let i = 0; i<CANTIDAD_PARTIDOS2; i+=1){
    partidosArray2.push({
      recintoDeportivoId2,
      resultado2: resultados[i],
      hora: horas2[i],
      fecha: fechas2[i],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }


    return queryInterface.bulkInsert('partidos', partidosArray);
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

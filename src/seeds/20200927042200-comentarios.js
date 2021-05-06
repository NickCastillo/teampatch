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
    const CANTIDAD_COMENTARIOS1 = 2
    const recintos = await queryInterface.sequelize.query(
     `SELECT id FROM recinto_deportivos WHERE nombre='${RECINTODEPORTIVO_NOMBRE}'`
    )
    const { id: recintoDeportivoId} = recintos[0][0];
    const comentariosArray = []
    const contenidos = ['Muy buen local! Amigable ordenado y barato!', 'Recomendado, hemos jugado varios partidos como equipo ya sin problema']
    for (let i = 0; i<CANTIDAD_COMENTARIOS1; i+=1){
      comentariosArray.push({
        recintoDeportivoId,
        contenido: contenidos[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
     return queryInterface.bulkInsert('comentarios', comentariosArray);
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

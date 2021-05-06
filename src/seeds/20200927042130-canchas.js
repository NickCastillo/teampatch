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
    const CANTIDAD_CANCHAS = 2
    const recintos = await queryInterface.sequelize.query(
      `SELECT id FROM recinto_deportivos WHERE nombre='${RECINTODEPORTIVO_NOMBRE}'`
    )
    const { id: recintoDeportivoId} = recintos[0][0];
    const canchasArray = []
    const precios = [5000, 10000]
    const tamaños = [['90','50'], ['150', '100']]
    const fotos = ['https://s3.amazonaws.com/storage.wobiz.com/134/134057/images/Large/1559166829_833304d7354f1fc13727dd00d94f6ef3.134057.jpeg',
                    'https://sc2.elpais.com.uy/files/article_default_content/uploads/2017/09/10/59b5af130410f.jpeg']

    for (let i = 0; i<CANTIDAD_CANCHAS; i+=1){
      canchasArray.push({
        recintoDeportivoId,
        disponible: true,
        descripcion: `Cancha XSoccer Numero ${i}`,
        precio: precios[i],
        largo: tamaños[i][0],
        ancho: tamaños[i][1],
        foto: fotos[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('canchas', canchasArray)
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

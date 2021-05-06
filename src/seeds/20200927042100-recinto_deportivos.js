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

    const recinto_deportivosArray = [];

    recinto_deportivosArray.push({
      nombre: 'Spartan Sports',
      correo: 'spartansport@gmail.com',
      telefono: '+56 9 1234 5678',
      bio: 'Somos un nuevo recinto deportivo que acaba de abrir! Ofrecemos una gran variedad de canchas para reservar. Contactanos! ',
      ubicacion: 'Francisco Bilbao 1400',
      contrasena:'$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      n_canchas: '4',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    recinto_deportivosArray.push({
      nombre: 'Xsoccer',
      correo: 'xsoccer@gmail.com',
      telefono: '+56 9 2345 6789',
      bio: 'Hola! Somos XSoccer, un recinto deportivo con una gran variedad de canchas de futbol ubicada en Vicuña Mackenna 4563. En nuestro perfil pueden encontrar imagenes, dimensiones y precios de nuestras canchas! Estamos abiertos de Lunes a Sabado desde las 10:00hrs hasta las 20:30hrs. Te esperamos!', 
      ubicacion: 'Vicuña Mackenna 4563',
      contrasena:'$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      n_canchas: '5',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    recinto_deportivosArray.push({
      nombre: 'Deportes UC',
      correo: 'deportesuc@uc.cl',
      telefono: '+56 9 2455 1243',
      bio: 'Somos el club deportivo de la universidad catolica ubicada en el Campus SJ. Nuestros horarios coinciden con los de la Universidad. Contamos con canchas de Futbol, Voleibal, Basketball (indoors y outdoors), y Tenis! Todo gratis pero esperamos una reserva anticipada! Debes ser estudiante de nuestra universidad.',
      ubicacion: 'Vicuña Mackenna 4561',
      contrasena:'$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      n_canchas: '10',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('recinto_deportivos', recinto_deportivosArray)

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

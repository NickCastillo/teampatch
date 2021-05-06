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
   const equiposArray = [];

   equiposArray.push({
    nombre: "LamboTeam",
    description: "Equipo de futbol - Amigos buenos pal mambo - Ingenieria UC Generacion '17 @ Campus San Joaquin",
    capitan: 1,
    horarios: "19:00",
    foto: "https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    deporteId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   equiposArray.push({
    nombre: "FOOTeam",
    description: "Equipo de voleibol buscando integrantes fuera de Ing UC para jugar los L y W a las 14:00hrs en Deportes UC.",
    capitan: 3,
    horarios: "19:00",
    foto: "https://team-patch.s3.amazonaws.com/soccerteam2.jpg",
    deporteId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   equiposArray.push({
    nombre: "Lorain",
    description: "Somos un equipo de Basquetbol conformado por jugadores de distintas carreras. Estamos buscando miembros para participar en un campeonato que se realiza los sabados a las 10:00 AM en el campus SJ",
    capitan: 2,
    horarios: "10:00",
    foto: "https://team-patch.s3.amazonaws.com/basketballteam.jpg",
    deporteId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   equiposArray.push({
    nombre: "Los Cracks",
    description: "Equipo de futbol en campus SJ con disponibilidad Lunes y Martes a las 14:00hrs y Jueves a las 19:30hrs.",
    capitan: 3,
    horarios: "14:00hrs, 19:30hrs",
    foto: "https://team-patch.s3.amazonaws.com/soccerteam.jpeg",
    deporteId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   });

   return queryInterface.bulkInsert('equipos', equiposArray);
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

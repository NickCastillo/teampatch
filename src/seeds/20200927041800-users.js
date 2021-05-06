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
      nombre: 'Cristobal Vargas',
      correo: 'civargas5@uc.cl',
      foto: 'https://team-patch.s3.amazonaws.com/varguitas1.png',
      username: 'crvargasu',
      telefono: '9 7985 4450',
      descripcion: 'Apaño changas L-M-J-V a las 14:00 hrs @ Campus SJ ',
      contrasena: '$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      admin: true,
      jefe: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      nombre: 'Nicolas Castillo',
      correo: 'nicastillo@uc.cl',
      foto: 'https://team-patch.s3.amazonaws.com/selfie1.png',
      username: '_nickcastillo',
      descripcion: 'Puedo jugar basket W-V @ 17:00hrs',
      telefono: '9 5197 2230',
      contrasena: '$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      admin: false,
      jefe: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      nombre: 'Matias Cea',
      correo: 'micea@uc.cl',
      foto: 'https://team-patch.s3.amazonaws.com/matias.png',
      username: 'micea',
      descripcion: 'Busco equipo para jugar Futbol L-M-W-J-V a las 12:00 y 16:30 hrs @ SJ',
      telefono: '9 3221 4839',
      contrasena: '$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      admin: false,
      jefe: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      nombre: 'Jesus Ochoa',
      correo: 'jiochoa@uc.cl',
      foto: 'https://team-patch.s3.amazonaws.com/girl-user.jpeg',
      username: 'jesu97ochoa',
      descripcion: 'Interesada en jugar Voleibol en los almuerzos!',
      telefono: '9 4241 3455',
      contrasena: '$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      admin: false,
      jefe: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      nombre: 'Francisco Vega',
      correo: 'fvega98@gmail.com',
      foto: 'https://team-patch.s3.amazonaws.com/pancho.png',
      username: 'elfocaochoa98',
      descripcion: 'Estoy buscando equipos de Futbol L-M-J-V a las 19:30hrs! ',
      telefono: '9 3894 2100',
      contrasena: '$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      admin: false,
      jefe: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    usersArray.push({
      nombre: 'Tomas Gonzales',
      correo: 'tgonzalez@gmail.com',
      foto: 'https://team-patch.s3.amazonaws.com/tomy.png',
      username: 'tgonzales_99',
      descripcion: 'Sus changas los lunes al almuerzo? ',
      telefono: '9 2444 1125',
      contrasena: '$2b$10$p4ODYD8k8A8CUVoiGSEem.uXdkCgeG.UlVBTeSvV9jOimb2qSoX3q',
      admin: false,
      jefe: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  

    return queryInterface.bulkInsert('users', usersArray);
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

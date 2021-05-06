const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const recinto_deportivo = sequelize.define('recinto_deportivo', {
    nombre: {
      type: DataTypes.STRING,
      allownull: false,
      isAlpha: true,
      validate: {
        notEmpty: true
      }
    },
    correo: {
      type: DataTypes.STRING,
      unique: true,
      allownull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    bio: {
      type: DataTypes.TEXT,
      allownull: false,
      notEmpty: true,
    },
    ubicacion: 
    { type: DataTypes.STRING,
      allownull: false,
      notEmpty: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allownull: false,
      notEmpty: true,
    },
    n_canchas: {
      type: DataTypes.INTEGER,
      min: 0,
      allownull: false,
      notEmpty: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    hooks: {
      beforeSave: async (instance) => {
        if (instance.changed('contrasena')) {
          instance.contrasena = await bcrypt.hash(instance.contrasena, 10);
        }
      }
    }
  });

  recinto_deportivo.associate = function associate(models) {
      recinto_deportivo.hasMany(models.cancha);

      recinto_deportivo.hasMany(models.partido);

      recinto_deportivo.hasMany(models.comentario);

  
  };

  return recinto_deportivo;
};

const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    correo: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true, 
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      unique: false,
      validate: {
        notEmpty: true, 
      },
    },
    foto: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true, 
      },
    },
    telefono: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
    },
    jefe: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    hooks: {
    beforeSave: async (instance) => {
      if (instance.changed('contrasena')) {
        instance.contrasena = await bcrypt.hash(instance.contrasena, 10);
      }
    }
  }
});

  user.associate = function associate(models) {

    user.hasMany(models.solicitud);
    user.hasMany(models.mensaje); 
    user.hasMany(models.comentario); 
  };
  
  return user;
};

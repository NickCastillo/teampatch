const KoaRouter = require('koa-router');
var jwt = require("jwt-simple");
const router = new KoaRouter();
const sendExampleEmail = require('../mailers/example');

const PERMITTED_FIELDS = [
    'nombre',
    'username',
    'correo',
    'foto',
    'descripcion',
    'telefono',
    'contrasena',
  ];
  const PERMITTED_FIELDS_2 = [
    'nombre',
    'username',
    'correo',
    'foto',
    'telefono',
    'contrasena',
    'admin'
  ];

router.param('id', async (id, ctx, next)=> {
  const nid = jwt.decode(id, 'xxx');
    const usuario = await ctx.orm.user.findByPk(nid);
    if (!usuario) ctx.throw(404);
    ctx.state.usuario = usuario;
    return next();
})

router.param('id_eliminar', async (id, ctx, next)=> {
  ctx.state.id=id;
  return next();
});

router.get('users-delete', '/delete/:id_eliminar', async (ctx) => {
  try{
      const id = ctx.state.id;
      await ctx.orm.user.destroy({
          where: {
            id: parseInt(id),
          }
        })
      ctx.redirect(ctx.router.url('users'));
  } catch (error){
      console.log("error")
      await ctx.render('users', {
          errors : error.errors,
          deleteUsersPath: ctx.router.url('users-delete'),
      }); 
  }
});

router.get('users', '/', async (ctx) => {
    const users = await ctx.orm.user.findAll();
    await ctx.render('users/index',{
    users,
    jwt,
    userPath: (id) => ctx.router.url('user', id),
    chatPath: (id, id2) => ctx.router.url('mensaje', id, id2),
    newUserPath: ctx.router.url('users-new'),
    deleteUsersPath: (id) => ctx.router.url('users-delete', id),
    });
});

router.get('users-react', '/users-react', async (ctx) => {
  const users = await ctx.orm.user.findAll();
  ctx.body = users;

});


router.get('users-new', '/new', (ctx) => {
    const user = ctx.orm.user.build();
    return ctx.render('users/new', {
      user,
      createUserPath: ctx.router.url('users-create'),
    });
})

router.post('users-create', '/', async (ctx) => {
  if (ctx.request.body.foto == ''){
    ctx.request.body.foto = "https://team-patch.s3.amazonaws.com/blank-profile-picture-973460_1280.png";
  } else {
    const foto = ctx.request.body.foto;
    ctx.request.body.foto = `https://team-patch.s3.amazonaws.com/${foto}`;
  }
  console.log(ctx.request.body);
      const user = ctx.orm.user.build(ctx.request.body);
      try {
        await user.save({ fields: PERMITTED_FIELDS });
        try{
          await sendExampleEmail(ctx, ctx.request.body.correo);
          ctx.redirect(ctx.router.url('session-new-user'));
        } catch(error){
          ctx.redirect(ctx.router.url('session-new-user'));
        }
      } catch (error) {
        await ctx.render('users/new', {
          user,
          errors: error.errors,
          createUserPath: ctx.router.url('users-create'),
        });
      }
    
});

router.get('user', '/:id', async(ctx)=>{
    const { usuario } = ctx.state;
    const equipo = ctx.orm.equipo.build();
    return ctx.render('users/show', {
        usuario,
        jwt,
        equipo,
        newEquiposPath : ctx.router.url('equipos-new'),
        equipos : await usuario.getEquipos(),
        //partidos: await usuario.getPartidos(),
        createEquiposPath : ctx.router.url('equipos-create'),
        solicituds: await usuario.getSolicituds(),
        mensajes: await usuario.getMensajes(),
        comentarios: await usuario.getComentarios(),
        userindexPath: ctx.router.url('users'),
        updateUsuariosPath: (id) => ctx.router.url('edit-user', id),
        editUsuariosPath :(id) => ctx.router.url('usuarios-edit', id),

    });
});

router.get('edit-user','/edit/:id', async (ctx) => { 
  const usuario = ctx.state.usuario;
  await ctx.render('users/edit', {
    jwt,
    usuario : usuario,
    editUsuariosPath :(id) => ctx.router.url('usuarios-edit', id),
  });
});

router.patch('usuarios-edit','/:id', async (ctx) => { 
  const usuario = ctx.state.usuario;
  try{
     if (ctx.request.body.drop1=="nombre"){
          await ctx.orm.user.update({ nombre  : ctx.request.body.cambio }, {
              where: {
              id: parseInt(usuario.id)
              }
          });
          ctx.redirect(ctx.router.url('users'));
     }

     if (ctx.request.body.drop1=="correo"){
      await ctx.orm.user.update({ correo  : ctx.request.body.cambio }, {
          where: {
          id: parseInt(usuario.id)
          }
      });
      ctx.redirect(ctx.router.url('users'));
    }
    
    if (ctx.request.body.drop1=="foto"){
      await ctx.orm.user.update({ foto  : ctx.request.body.cambio }, {
          where: {
          id: parseInt(usuario.id)
          }
      });
      ctx.redirect(ctx.router.url('users'));
    }

    if (ctx.request.body.drop1=="username"){
      await ctx.orm.user.update({ username  : ctx.request.body.cambio }, {
          where: {
          id: parseInt(usuario.id)
          }
      });
      ctx.redirect(ctx.router.url('users'));
    }

    if (ctx.request.body.drop1=="telefono"){
      await ctx.orm.user.update({ telefono  : ctx.request.body.cambio }, {
          where: {
          id: parseInt(usuario.id)
          }
      });
      ctx.redirect(ctx.router.url('users'));
    }

    if (ctx.request.body.drop1=="contrasena"){
      await usuario.update({ contrasena  : ctx.request.body.cambio });

      ctx.redirect(ctx.router.url('users'));
    }

  } catch (error){
      await ctx.render('users/edit', {
          usuario : usuario,
          errors : error.errors,
          editUsuariosPath :(id) =>  ctx.router.url('usuarios-edit', id),
      }); 
  }
  
});


module.exports = router;
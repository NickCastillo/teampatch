const KoaRouter = require('koa-router');
const { Op } = require("sequelize");
const router = new KoaRouter();
var jwt = require("jwt-simple");


const PERMITTED_FIELDS = [
    'contenido',
    'userId',
    'userId2',
  ];

router.param('id', async (id, ctx, next)=> {
  const nid = jwt.decode(id, 'xxx');
    const mensaje = await ctx.orm.mensaje.findByPk(nid);
    ctx.state.id = id; 
    if (!mensaje) ctx.throw(404);
    ctx.state.mensaje = mensaje;
    return next();
})

router.param('id1', async (id, ctx, next)=> {
  ctx.state.id1 = id;
  return next();
});

router.param('id2', async (id, ctx, next)=> {
  ctx.state.id2 = id;
  return next();
});

router.param('id_eliminar', async (id, ctx, next)=> {
  ctx.state.id=id;
  return next();
});

router.get('edit-mensaje','/edit/:id', async (ctx) => { 
  const mensaje = ctx.state.mensaje;
  await ctx.render('mensajes/edit', {
      mensaje : mensaje,
      editMensajePath :(id) => ctx.router.url('mensaje-edit', id),
  });
});

router.post('mensaje-edit','/:id', async (ctx) => { 
  const mensaje = ctx.state.mensaje;
  try{
     if (ctx.request.body.drop1=="contenido"){
          await ctx.orm.mensaje.update({ contenido  : ctx.request.body.cambio }, {
              where: {
              id: parseInt(mensaje.id)
              }
          });
          ctx.redirect(ctx.router.url('mensajes'));
     }
  } catch (error){
      await ctx.render('mensajes/edit', {
          mensaje : mensaje,
          errors : error.errors,
          editMensajePath :(id) =>  ctx.router.url('mensaje-edit', id),
      }); 
  }
});

router.get('mensajes-delete', '/delete/:id_eliminar', async (ctx) => {
  try{
      const id = ctx.state.id;
      await ctx.orm.mensaje.destroy({
          where: {
            id: parseInt(id),
          }
        })
      ctx.redirect(ctx.router.url('mensajes'));
  } catch (error){
      console.log("error")
      await ctx.render('mensajes', {
          errors : error.errors,
          deleteMensajePath: ctx.router.url('mensajes-delete'),
      }); 
  }
});

router.get('mensajes', '/', async (ctx) => {
    const mensajes = await ctx.orm.mensaje.findAll();
    await ctx.render('mensajes/index', {
        mensajes,
        mensajePath: (id1, id2) => ctx.router.url('mensaje', id1, id2),
        newMensajePath: ctx.router.url('mensajes-new'),
        deleteMensajePath: (id) => ctx.router.url('mensajes-delete', id),
    });
});

router.get('mensajes-new', '/new', (ctx) => {
    const mensaje = ctx.orm.mensaje.build();
    return ctx.render('mensajes/new', {
      mensaje,
      createMensajePath: ctx.router.url('mensajes-create'),
    });
})

router.post('mensajes-create', '/:id1/:id2', async (ctx) => {
  const mensaje = ctx.orm.mensaje.build(ctx.request.body);
  try {
    await mensaje.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('mensaje', {
      id1: ctx.state.id1,
      id2: ctx.state.id2,
    }));
  } catch (error) {
    await ctx.render('mensajes/new', {
      mensaje,
      errors: error.errors,
      createMensajePath: ctx.router.url('mensajes-create'),
    });
  }
});

router.get('mensaje', '/:id1/:id2', async (ctx)=>{
  const emisor_jwt = ctx.state.id1;
  const receptor_jwt = ctx.state.id2;
  const emisor = jwt.decode(ctx.state.id1, 'xxx');
  const receptor = jwt.decode(ctx.state.id2, 'xxx');
    const usuario1 = await ctx.orm.user.findByPk(emisor);
    const usuario2 = await ctx.orm.user.findByPk(receptor);
    const mensajes = await ctx.orm.mensaje.findAll(
      {
        where: {
          [Op.or]: [
            {[Op.and]: [{userId: emisor},
            {userId2: receptor},
            ]},

            {[Op.and]: [{userId: receptor},
              {userId2: emisor},
              ]},
          ]
        }
      });
    return ctx.render('mensajes/show', {
        mensajes,
        usuario1,
        usuario2,
        emisor_jwt,
        receptor_jwt,
        userindexPath: ctx.router.url('users'),
        mensajeindexPath: ctx.router.url('mensajes'),
        createMensajePath: (id1, id2) => ctx.router.url('mensajes-create', id1, id2),
        updateMensajePath: (id) => ctx.router.url('edit-mensaje', id)
    });
});

module.exports = router;
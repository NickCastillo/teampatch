const KoaRouter = require('koa-router');
var jwt = require("jwt-simple");


const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'estado',
    'descripcion',
    'fecha',
  ];

router.param('id', async (id, ctx, next)=> {
  const nid = jwt.decode(id, 'xxx');
    const solicitud = await ctx.orm.solicitud.findByPk(nid);
    if (!solicitud) ctx.throw(404);
    ctx.state.solicitud = solicitud;
    return next();
})

router.param('id_eliminar', async (id, ctx, next)=> {
  ctx.state.id=id;
  return next();
});

router.get('solicituds-delete', '/delete/:id_eliminar', async (ctx) => {
  try{
      const id = ctx.state.id;
      await ctx.orm.solicitud.destroy({
          where: {
            id: parseInt(id),
          }
        })
      ctx.redirect(ctx.router.url('solicituds'));
  } catch (error){
      console.log("error")
      await ctx.render('solicituds', {
          errors : error.errors,
          deleteSolicitudPath: ctx.router.url('solicituds-delete'),
      }); 
  }
});


router.get('edit-solicitud','/edit/:id', async (ctx) => { 
  const solicitud = ctx.state.solicitud;
  await ctx.render('solicituds/edit', {
      solicitud : solicitud,
      editSolicitudPath :(id) => ctx.router.url('solicitud-edit', id),
  });
});

router.post('solicitud-edit','/:id', async (ctx) => { 
  console.log(ctx.request.body);
  const solicitud = ctx.state.solicitud;
  try{
      await ctx.orm.solicitud.update({ 
        descripcion  : ctx.request.body.descripcion,
        fecha: ctx.request.body.fecha},
        {
          where: {
          id: parseInt(solicitud.id)
          }
      });
      ctx.redirect(ctx.router.url('solicituds'));
  } catch (error){
      await ctx.render('solicituds/edit', {
          solicitud : solicitud,
          errors : error.errors,
          editSolicitudPath :(id) =>  ctx.router.url('solicitud-edit', id),
      }); 
  }
  
});


router.get('solicituds', '/', async (ctx) => {
    const solicituds = await ctx.orm.solicitud.findAll();
    await ctx.render('solicituds/index', {
        solicituds,
        solicitudPath: (id) => ctx.router.url('solicitud', id),
        newSolicitudPath: ctx.router.url('solicituds-new'),
        deleteSolicitudPath: (id) => ctx.router.url('solicituds-delete', id),
    });
});

router.get('mis.solicituds', '/filter', async (ctx) => {
  const user_id = parseInt(jwt.decode(ctx.state.currentUser.id, 'xxx'));
  const solicituds = await ctx.orm.solicitud.findAll({where: {userId: user_id}});
  for(let solicitud of solicituds){
    let a = await solicitud.getEquipo();
    solicitud.equipoId = a;
}
  await ctx.render('solicituds/filter', {
      solicituds,
      rechazarPath : ctx.router.url('cancelar'),
  });
});

router.get('solicituds-new', '/new', (ctx) => {
    const solicitud = ctx.orm.solicitud.build();
    return ctx.render('solicituds/new', {
      solicitud,
      createSolicitudPath: ctx.router.url('solicituds-create'),
    });
})

router.post('solicituds-create', '/', async (ctx) => {
    const solicitud = ctx.orm.solicitud.build(ctx.request.body);
    try {
      await solicitud.save({ fields: PERMITTED_FIELDS });
      ctx.redirect(ctx.router.url('solicituds'));
    } catch (error) {
      await ctx.render('solicituds/new', {
        solicitud,
        errors: error.errors,
        createSolicitudPath: ctx.router.url('solicituds-create'),
      });
    }
});

router.get('solicitud', '/:id', async (ctx)=>{
    const { solicitud } = ctx.state;
    console.log("solicitud");
    console.log(solicitud);
    return ctx.render('solicituds/show', {
        solicitud,
        solicitudindexPath: ctx.router.url('solicituds'),
        updateSolicitudPath: (id) => ctx.router.url('edit-solicitud', id)
    });
});

module.exports = router;
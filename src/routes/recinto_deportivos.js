const KoaRouter = require('koa-router');
const router = new KoaRouter();
var jwt = require("jwt-simple");
const sendExampleEmail = require('../mailers/example');

const PERMITTED_FIELS = [
    'nombre',
    'contrasena',
    'correo',
    'bio',
    'telefono',
    'ubicacion',
    'n_canchas',
];

router.param('id', async (id, ctx, next) => {
    const nid = jwt.decode(id, 'xxx');
    const recinto_deportivo = await ctx.orm.recinto_deportivo.findByPk(nid);
    if (!recinto_deportivo) ctx.throw(404);
    ctx.state.recinto_deportivo = recinto_deportivo;
    return next();
});

router.param('id_eliminar', async (id, ctx, next)=> {
    ctx.state.id=id;
    return next();
});

router.get('recinto_deportivos','/', async (ctx) => {
    const recintos_deportivos = await ctx.orm.recinto_deportivo.findAll();
    
    await ctx.render('recinto_deportivos/index', { 
        recintos_deportivos,
        jwt,
        recinto_deportivoPath: (id) => ctx.router.url('recinto_deportivo', id),
        deleteRecinto_deportivosPath : (id) => ctx.router.url('recinto_deportivos-delete', id),
        newRecinto_deportivoPath: ctx.router.url('recinto_deportivos-new'), 
      });
    });

router.get('recinto_deportivos-new', '/new', (ctx) => {
    const recinto_deportivo = ctx.orm.recinto_deportivo.build();
    return ctx.render('recinto_deportivos/new', {
        recinto_deportivo,
        createRecinto_deportivoPath: ctx.router.url("recinto_deportivos-create"),
    });
});

router.post('recinto_deportivos-create', '/', async (ctx) => {
    const recinto_deportivo = ctx.orm.recinto_deportivo.build(ctx.request.body);
    try {
        await recinto_deportivo.save({ fields: PERMITTED_FIELS });
        try{
            await sendExampleEmail(ctx, ctx.request.body.correo);
            ctx.redirect(ctx.router.url('session-new-recinto'));
        }catch(error){
            ctx.redirect(ctx.router.url('session-new-recinto'));
        }
        
        
    } catch (error){
        await ctx.render('recinto_deportivos/new', {
            recinto_deportivo,
            errors: error.errors,
            createRecinto_deportivoPath: ctx.router.url("recinto_deportivos-create"),
        });
    }
});

router.get('edit-recinto_deportivos','/edit/:id', async (ctx) => { 
    const recinto_deportivo = ctx.state.recinto_deportivo;
    await ctx.render('recinto_deportivos/edit', {
        recinto_deportivo : recinto_deportivo,
        editRecinto_deportivosPath :(id) => ctx.router.url('recinto_deportivos-edit', id),
    });
});

router.post('recinto_deportivos-edit','/:id', async (ctx) => { 
    const recinto_deportivo = ctx.state.recinto_deportivo;
    try{
       if (ctx.request.body.drop1=="nombre"){
            await ctx.orm.recinto_deportivo.update({ nombre  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(recinto_deportivo.id)
                }
            });
            ctx.redirect(ctx.router.url('recinto_deportivos'));
       }
       else if (ctx.request.body.drop1=="contrasena"){
        await recinto_deportivo.update({ contrasena  : ctx.request.body.cambio });
        ctx.redirect(ctx.router.url('recinto_deportivos'));
      }
       else if (ctx.request.body.drop1=="correo"){
        await ctx.orm.recinto_deportivo.update({ correo  : ctx.request.body.cambio }, {
            where: {
            id: parseInt(recinto_deportivo.id)
            }
        });
        ctx.redirect(ctx.router.url('recinto_deportivos'));
        }
        else if (ctx.request.body.drop1=="bio"){
            await ctx.orm.recinto_deportivo.update({ bio  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(recinto_deportivo.id)
                }
            });
            ctx.redirect(ctx.router.url('recinto_deportivos'));
        }
        else if (ctx.request.body.drop1=="ubicacion"){
            await ctx.orm.recinto_deportivo.update({ ubicacion  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(recinto_deportivo.id)
                }
            });
            ctx.redirect(ctx.router.url('recinto_deportivos'));
        }
        else if (ctx.request.body.drop1=="telefono"){
            await ctx.orm.recinto_deportivo.update({ telefono  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(recinto_deportivo.id)
                }
            });
            ctx.redirect(ctx.router.url('recinto_deportivos'));
        }
        else if (ctx.request.body.drop1=="n_canchas"){
            await ctx.orm.recinto_deportivo.update({ n_canchas  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(recinto_deportivo.id)
                }
            });
            ctx.redirect(ctx.router.url('recinto_deportivos'));
        };
    } catch (error){
        await ctx.render('recinto_deportivos/edit', {
            recinto_deportivo : recinto_deportivo,
            errors : error.errors,
            editRecinto_deportivosPath :(id) =>  ctx.router.url('recinto_deportivos-edit', id),
        }); 
    }
    
});

router.get('recinto_deportivos-delete', '/delete/:id_eliminar', async (ctx) => {
    try{
        const id = ctx.state.id;
        await ctx.orm.recinto_deportivo.destroy({
            where: {
              id: parseInt(id),
            }
          })
        ctx.redirect(ctx.router.url('recinto_deportivos'));
    } catch (error){
        console.log("error")
        await ctx.render('recinto_deportivos/delete', {
            errors : error.errors,
            deleteRecinto_deportivosPath : (id) => ctx.router.url('recinto_deportivos-delete', id),
        }); 
    }
});

router.get('recinto_deportivo','/:id', async (ctx) => {
    const { recinto_deportivo } = ctx.state;
    var aviso = 0;
    const equipos = await ctx.orm.equipo.findAll();
    return ctx.render('recinto_deportivos/show', { 
        recinto_deportivo: recinto_deportivo,
        jwt,
        aviso, 
        canchaPath: (id) => ctx.router.url('cancha', id),
        canchaPath2: (id) => ctx.router.url('cancha-show2', id),
        canchas: await recinto_deportivo.getCanchas(),
        partidos: await recinto_deportivo.getPartidos(),
        comentarios: await recinto_deportivo.getComentarios(),
        newSolicitudPath: ctx.router.url('solicituds-new'),
        createReservaPath : ctx.router.url('reserva-create'),
        equipos: equipos,
        updateRecinto_deportivosPath :(id) => ctx.router.url('edit-recinto_deportivos', id),
        
    });
});


module.exports = router;
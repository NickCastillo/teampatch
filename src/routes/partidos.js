const KoaRouter = require('koa-router');
const router = new KoaRouter();
var jwt = require("jwt-simple");


PERMITED_FIELD= [
    "fecha",
    "hora",
    "resultado",
];

router.param('id', async (id, ctx, next)=> {
    const nid = jwt.decode(id, 'xxx');
    const partido = await ctx.orm.partido.findByPk(nid);
    ctx.state.partido=partido;
    return next();
});

router.param('id_eliminar', async (id, ctx, next)=> {
    ctx.state.id=id;
    return next();
});

router.get('edit-partidos','/edit/:id', async (ctx) => { 
    const partido = ctx.state.partido;
    //console.log("asdjsa123:" + partido);
    await ctx.render('partidos/edit', {
        partido : partido,
        editPartidosPath :(id) => ctx.router.url('partidos-edit', id),
    });
});

router.post('partidos-edit','/:id', async (ctx) => { 
    const partido = ctx.state.partido;
    try{
       if (ctx.request.body.drop1=="fecha"){
            await ctx.orm.partido.update({ fecha  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(partido.id)
                }
            });
            ctx.redirect(ctx.router.url('partidos'));
       }
        else if (ctx.request.body.drop1=="resultado"){
            await ctx.orm.partido.update({ resultado  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(partido.id)
                }
            });
            ctx.redirect(ctx.router.url('partidos'));
        }
        else if (ctx.request.body.drop1=="hora"){
            await ctx.orm.partido.update({ hora  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(partido.id)
                }
            });
            ctx.redirect(ctx.router.url('partidos'));
        };
    } catch (error){
        await ctx.render('partidos/edit', {
            partido : partido,
            errors : error.errors,
            editPartidosPath :(id) =>  ctx.router.url('partidos-edit', id),
        }); 
    }
    
});

router.get('partidos-delete', '/delete/:id_eliminar', async (ctx) => {
    try{
        const id = ctx.state.id;
        await ctx.orm.partido.destroy({
            where: {
              id: parseInt(id),
            }
          })
        ctx.redirect(ctx.router.url('partidos'));
    } catch (error){
        console.log("error")
        await ctx.render('partidos/delete', {
            errors : error.errors,
            deletePartidosPath: ctx.router.url('partidos-delete'),
        }); 
    }
});

router.get('partidos','/', async (ctx) => { 
    const partidos = await ctx.orm.partido.findAll();
    await ctx.render('partidos/index', {partidos : partidos,
        partidosPath : (id) => ctx.router.url('partido', id), 
        deletePartidosPath : (id) => ctx.router.url('partidos-delete', id), 
        newPartidosPath : ctx.router.url('partidos-new'),
    });
});

router.get('partidos-new','/new', (ctx) => { 
    const partido = ctx.orm.partido.build();
    return ctx.render('partidos/new', {
        partido : partido,
        createPartidosPath : ctx.router.url('partidos-create'),
    });
});

router.post('partidos-create','/', async (ctx) => { 
    const partido = ctx.orm.partido.build(ctx.request.body);
    try{
        await partido.save({ fields: PERMITED_FIELD});
        ctx.redirect(ctx.router.url('partidos'));
    } catch (error){
        await ctx.render('partidos/new', {
            partido : partido,
            errors : error.errors,
            createPartidosPath : ctx.router.url('partidos-create'),
        }); 
    }
    
});

router.get('partido', '/:id', async (ctx) => {
    const partido = ctx.state.partido;
    return ctx.render('partidos/show', {
        partido : partido,
        updatePartidosPath : (id) => ctx.router.url('edit-partidos', id),
        equipos : await partido.getEquipos(),
        
    });
});



module.exports = router;
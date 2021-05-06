const KoaRouter = require('koa-router');
var jwt = require("jwt-simple");

const router = new KoaRouter();

const PERMITED_FIELD = [
    'nombre',
];

router.param('id', async (id, ctx, next) => {
    const nid = jwt.decode(id, 'xxx');
    const deporte = await ctx.orm.deporte.findByPk(nid);
    if (!deporte) ctx.throw(404);
    ctx.state.deporte = deporte;
    return next();
});

router.param('id_eliminar', async (id, ctx, next)=> {
    ctx.state.id=id;
    return next();
});

router.get('edit-deportes','/edit/:id', async (ctx) => { 
    const deporte = ctx.state.deporte;
    await ctx.render('deportes/edit', {
        deporte : deporte,
        editDeportesPath :(id) => ctx.router.url('deportes-edit', id),
    });
});

router.post('deportes-edit','/:id', async (ctx) => { 
    const deporte = ctx.state.deporte;
    try{
       if (ctx.request.body.drop1=="nombre"){
            await ctx.orm.deporte.update({ nombre  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(deporte.id)
                }
            });
            ctx.redirect(ctx.router.url('deportes'));
       }
    } catch (error){
        await ctx.render('deportes/edit', {
            deporte : deporte,
            errors : error.errors,
            editDeportesPath :(id) =>  ctx.router.url('deportes-edit', id),
        }); 
    }
    
});

router.get('deportes-delete', '/delete/:id_eliminar', async (ctx) => {
    try{
        const id = ctx.state.id;
        await ctx.orm.deporte.destroy({
            where: {
              id: parseInt(id),
            }
          })
        ctx.redirect(ctx.router.url('deportes'));
    } catch (error){
        console.log("error")
        await ctx.render('deportes/delete', {
            errors : error.errors,
            deleteDeportesPath: ctx.router.url('deportes-delete'),
        }); 
    }
});


router.get('deportes','/', async (ctx) => { 
    const deportes = await ctx.orm.deporte.findAll();
    await ctx.render('deportes/index', {
        deportes : deportes,
        deportesPath : (id) => ctx.router.url('deporte', id), 
        deleteDeportesPath : (id) => ctx.router.url('deportes-delete', id),
        newDeportesPath : ctx.router.url('deportes-new'),
    });
});

router.get('deportes-new','/new', (ctx) => { 
    const deporte = ctx.orm.deporte.build();
    return ctx.render('deportes/new', {
        deporte : deporte,
        createDeportesPath : ctx.router.url('deportes-create'),
    });
});

router.post('deportes-create','/', async (ctx) => { 
    const deporte = ctx.orm.deporte.build(ctx.request.body);
    try{
        await deporte.save({ fields: PERMITED_FIELD});
        ctx.redirect(ctx.router.url('deportes'));
    } catch (error){
        await ctx.render('deportes/new', {
            deporte : deporte,
            errors : error.errors,
            createDeportesPath : ctx.router.url('deportes-create'),
        }); 
    }
    
});

router.get('deporte','/:id', async (ctx) => { 
    const deporte = ctx.state.deporte;
    return ctx.render('deportes/show', {
        deporte : deporte,
        updateDeportesPath : (id) => ctx.router.url('edit-deportes', id),
        events: await deporte.getEquipos(),
    });
});




module.exports = router;
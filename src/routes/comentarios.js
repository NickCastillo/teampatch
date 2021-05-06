const KoaRouter = require('koa-router');
const router = new KoaRouter();
var jwt = require("jwt-simple");


const PERMITTED_FIELS = [
    'contenido',
    'timestamp',
    'userId'
];

router.param('id', async (id, ctx, next) => {
    const nid = jwt.decode(id, 'xxx');
    const comentario = await ctx.orm.comentario.findByPk(nid);
    if (!comentario) ctx.throw(404);
    ctx.state.comentario = comentario;
    return next();
});

router.param('id_eliminar', async (id, ctx, next)=> {
    ctx.state.id=id;
    return next();
});

router.get('comentarios','/', async (ctx) => {
    const comentarios = await ctx.orm.comentario.findAll();
    await ctx.render('comentarios/index', { 
        comentarios,
        comentarioPath: id => ctx.router.url('comentario', id),
        deleteComentariosPath : (id) => ctx.router.url('comentarios-delete', id),
        newComentarioPath: ctx.router.url('comentarios-new'),
    });
});

router.get('comentarios-new', '/new', (ctx) => {
    const comentario = ctx.orm.comentario.build();
    return ctx.render('comentarios/new', {
        comentario,
        createComentarioPath: ctx.router.url("comentarios-create"),
    });
});

router.post('comentarios-create', '/', async (ctx) => {
    const comentario = ctx.orm.comentario.build(ctx.request.body);
    try {
        await comentario.save({ fields: PERMITTED_FIELS });
        ctx.redirect(ctx.router.url('comentarios'));
    } catch (error){
        await ctx.render('comentarios/new', {
            comentario,
            errors: error.errors,
            createComentarioPath: ctx.router.url("comentarios-create"),
        });
    }
});

router.get('edit-comentarios','/edit/:id', async (ctx) => { 
    const comentario = ctx.state.comentario;
    await ctx.render('comentarios/edit', {
        comentario : comentario,
        editComentariosPath :(id) => ctx.router.url('comentarios-edit', id),
    });
});

router.post('comentarios-edit','/:id', async (ctx) => { 
    const comentario = ctx.state.comentario;
    try{
       if (ctx.request.body.drop1=="contenido"){
            await ctx.orm.comentario.update({ contenido  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(comentario.id)
                }
            });
            ctx.redirect(ctx.router.url('comentarios'));
       };
    } catch (error){
        await ctx.render('comentarios/edit', {
            comentario : comentario,
            errors : error.errors,
            editComentariosPath :(id) =>  ctx.router.url('comentarios-edit', id),
        }); 
    }
});

router.get('comentarios-delete', '/delete/:id_eliminar', async (ctx) => {
    try{
        const id = ctx.state.id;
        await ctx.orm.comentario.destroy({
            where: {
              id: parseInt(id),
            }
          })
        ctx.redirect(ctx.router.url('comentarios'));
    } catch (error){
        console.log("error")
        await ctx.render('comentarios/delete', {
            errors : error.errors,
            deleteComentariosPath : (id) => ctx.router.url('comentarios-delete', id),
        }); 
    }
});

router.get('comentario','/:id', (ctx) => {
    const { comentario } = ctx.state;
    return ctx.render('comentarios/show', { 
        comentario,
        updateComentariosPath :(id) => ctx.router.url('edit-comentarios', id),
     });
});

module.exports = router;
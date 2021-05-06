const KoaRouter = require('koa-router');
const router = new KoaRouter();
var jwt = require("jwt-simple");


const PERMITTED_FIELS = [
    'largo',
    'ancho',
    'disponible',
    'descripcion',
    'foto',
    'precio',
    'recintoDeportivoId',
];

router.param('id', async (id, ctx, next) => {
    const nid = jwt.decode(id, 'xxx');
    const cancha = await ctx.orm.cancha.findByPk(nid);
    if (!cancha) ctx.throw(404);
    ctx.state.cancha = cancha;
    return next();
});

router.param('id_eliminar', async (id, ctx, next)=> {
    ctx.state.id=id;
    return next();
});

router.get('canchas','/', async (ctx) => {
    const recinto_id = parseInt(jwt.decode(ctx.state.currentRecinto.id, 'xxx'));
    const canchas = await ctx.orm.cancha.findAll({where: {recintoDeportivoId: recinto_id}});

    //const canchas = await ctx.orm.cancha.findAll();
    const cancha = ctx.orm.cancha.build();

    await ctx.render('canchas/index', { 
        cancha, 
        canchas,
        jwt,
        //canchaPath: (id) => ctx.router.url('cancha', id),
        canchaPath2: (id) => ctx.router.url('cancha-show2', id),
        deleteCanchasPath : (id) => ctx.router.url('canchas-delete', id),
        createCanchaPath: ctx.router.url('canchas-create'),

    });
});

router.get('canchas-new', '/new', (ctx) => {
    const cancha = ctx.orm.cancha.build();
    return ctx.render('canchas/new', {
        cancha : cancha,
        createCanchaPath: ctx.router.url("canchas-create"),
    });
});

router.get('cancha-show2', '/:id/anything', (ctx) => {
    return ctx.render('canchas/show2', {
        createCanchaPath: ctx.router.url("canchas-create"),
    });
});

router.post('canchas-create', '/', async (ctx) => {
    console.log(ctx.request.body);
    if (ctx.request.body.foto == ''){
        ctx.request.body.foto = "https://s3.amazonaws.com/storage.wobiz.com/134/134057/images/Large/1559166829_833304d7354f1fc13727dd00d94f6ef3.134057.jpeg";
      } else {
        const foto = ctx.request.body.foto;
        ctx.request.body.foto = `https://team-patch.s3.amazonaws.com/${foto}`;
      }
    const cancha = ctx.orm.cancha.build(ctx.request.body);
    try {
        await cancha.save({ fields: PERMITTED_FIELS });
        ctx.redirect(ctx.router.url('canchas'));
    } catch (error){
        await ctx.render('canchas/new', {
            cancha,
            errors: error.errors,
            createCanchaPath: ctx.router.url("canchas-create"),
        });
    }
});

router.get('edit-canchas','/edit/:id', async (ctx) => { 
    const cancha = ctx.state.cancha;
    await ctx.render('canchas/edit', {
        cancha : cancha,
        editCanchasPath :(id) => ctx.router.url('canchas-edit', id),
    });
});

router.post('canchas-edit','/:id', async (ctx) => { 
    const cancha = ctx.state.cancha;
    try{
       if (ctx.request.body.drop1=="largo"){
            await ctx.orm.cancha.update({ largo  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(cancha.id)
                }
            });
            ctx.redirect(ctx.router.url('canchas'));
       }
       else if (ctx.request.body.drop1=="ancho"){
        await ctx.orm.cancha.update({ ancho  : ctx.request.body.cambio }, {
            where: {
            id: parseInt(cancha.id)
            }
        });
        ctx.redirect(ctx.router.url('canchas'));
        }
        else if (ctx.request.body.drop1=="precio"){
            await ctx.orm.cancha.update({ precio  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(cancha.id)
                }
            });
            ctx.redirect(ctx.router.url('canchas'));
        }
        else if (ctx.request.body.drop1=="descripcion"){
            await ctx.orm.cancha.update({ descripcion  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(cancha.id)
                }
            });
            ctx.redirect(ctx.router.url('canchas'));
        }
        else if (ctx.request.body.drop1=="disponible"){
            await ctx.orm.cancha.update({ disponible  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(cancha.id)
                }
            });
            ctx.redirect(ctx.router.url('canchas'));
        }
        else if (ctx.request.body.drop1=="foto"){
            await ctx.orm.cancha.update({ foto  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(cancha.id)
                }
            });
            ctx.redirect(ctx.router.url('canchas'));
        };
    } catch (error){
        await ctx.render('canchas/edit', {
            cancha : cancha,
            errors : error.errors,
            editPartidosPath :(id) =>  ctx.router.url('canchas-edit', id),
        }); 
    }
    
});

router.get('canchas-delete', '/delete/:id_eliminar', async (ctx) => {
    try{
        const id = jwt.decode(ctx.state.id, 'xxx');
        await ctx.orm.cancha.destroy({
            where: {
              id: parseInt(id),
            }
          })
        ctx.redirect(ctx.router.url('canchas'));
    } catch (error){
        console.log("error")
        await ctx.render('canchas/delete', {
            errors : error.errors,
            deleteCanchasPath : (id) => ctx.router.url('canchas-delete', id),
        }); 
    }
});

router.get('cancha', '/:id', async(ctx) => {
    const reserva = ctx.orm.reserva.build();
    const { cancha } = ctx.state;
    var aviso = 0;
    const equipos = await ctx.orm.equipo.findAll({where: {capitan: jwt.decode(ctx.session.current_user.id, 'xxx')}});
    return ctx.render('canchas/show', {
        aviso, 
        cancha,
        reserva,
        equipos,
        canchaPath2: (id) => ctx.router.url('cancha-show2', id),
        createReservaPath : ctx.router.url('reserva-create'),
        updateCanchasPath :(id) => ctx.router.url('edit-canchas', id),
        createEquiposPath : ctx.router.url('equipos-create'),
    });
});


module.exports = router;
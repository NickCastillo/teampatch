const KoaRouter = require('koa-router');
var jwt = require("jwt-simple");

const router = new KoaRouter();

const PERMITED_FIELD = [
    'nombre',
    'description',
    'capitan',
    'horarios',
    'foto',
    'deporteId',
];
router.param('id', async (id, ctx, next) => {
    const nid = jwt.decode(id, 'xxx');
    const equipo = await ctx.orm.equipo.findByPk(nid);
    ctx.state.equipo = equipo;
    return next();
});

router.param('id_eliminar', async (id, ctx, next)=> {
    ctx.state.id=id;
    return next();
});

router.get('edit-equipos','/edit/:id', async (ctx) => { 
    const equipo = ctx.state.equipo;
    console.log(equipo);
    await ctx.render('equipos/edit', {
        equipo : equipo,
        editEquiposPath :(id) => ctx.router.url('equipos-edit', id),
    });
});

router.get('mis-equipos','/filter', async (ctx) => { 
    const equipo = ctx.orm.equipo.build();
    const user_id = parseInt(jwt.decode(ctx.state.currentUser.id, 'xxx'));
    const equipos = await ctx.orm.equipo.findAll({where: {capitan: user_id}});
    for(let equipo of equipos){
        let a = await equipo.getDeporte();
        equipo.deporteId = a;
    };
    const size = await ctx.orm.equipo.count({where: {capitan: user_id}});
    const deportes = await ctx.orm.deporte.findAll();

    await ctx.render('equipos/filter', {
        equipo,
        equipos : equipos,
        size : size,
        equiposPath : (id) => ctx.router.url('equipo', id), 
        jwt,
        deleteEquiposPath : (id) => ctx.router.url('equipos-delete', id),
        newEquiposPath : ctx.router.url('equipos-new'),
        createEquiposPath : ctx.router.url('equipos-create'),
        deportes: deportes,
        
    });
});

router.patch('aceptar','/aceptar', async (ctx) => { 
    const equipo_id = parseInt(ctx.request.body.equipo_id);
    const user_id = parseInt(ctx.request.body.user_id);
    const id = parseInt(ctx.request.body.id);
    await ctx.orm.solicitud.update({ estado  : 1 }, {
        where: {
        id: id,
        }
    });
    const equipo_user = ctx.orm.userequipo.build({
        equipoId: equipo_id,
        userId: user_id,
    });
    await equipo_user.save();
    ctx.redirect(ctx.router.url('equipos'));

});

router.patch('rechazar','/rechazar', async (ctx) => { 
    const equipo_id = parseInt(ctx.request.body.equipo_id);
    const id = parseInt(ctx.request.body.id);
    await ctx.orm.solicitud.update({ estado  : 2 }, {
        where: {
        id: id,
        }
    });
    // OJO con la siguiente linea:
    // ctx.redirect(ctx.router.url(`equipos/show/${jwt.encode(equipo_id, 'xxx')}`));
    
    ctx.redirect(ctx.router.url('equipos'));
});

router.patch('cancelar','/cancelar', async (ctx) => { 
    const id = parseInt(ctx.request.body.id);
    await ctx.orm.solicitud.update({ estado  : 3 }, {
        where: {
        id: id,
        }
    });
    ctx.redirect(ctx.router.url('equipos'));
});


router.post('equipos-users', '/asociar', async (ctx) => { 
    const equipo_id = parseInt(ctx.request.body.equipo_id);
    const descripcion = ctx.request.body.descripcion;
    const user_id = parseInt(jwt.decode(ctx.request.body.user_id, 'xxx'));
    const solicitud = ctx.orm.solicitud.build({
        estado: 0,
        descripcion: descripcion,
        userId: user_id,
        equipoId: equipo_id
    });
    await solicitud.save();
    ctx.redirect(ctx.router.url('equipos'));
});

router.post('equipos-edit','/:id', async (ctx) => { 
    const equipo = ctx.state.equipo;
    try{
       if (ctx.request.body.drop1=="nombre"){
            await ctx.orm.equipo.update({ nombre  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(equipo.id)
                }
            });
            ctx.redirect(ctx.router.url('equipos'));
       }
       else if (ctx.request.body.drop1=="description"){
        await ctx.orm.equipo.update({ description  : ctx.request.body.cambio }, {
            where: {
            id: parseInt(equipo.id)
            }
        });
        ctx.redirect(ctx.router.url('equipos'));
        }
        else if (ctx.request.body.drop1=="capitan"){
            await ctx.orm.equipo.update({ capitan  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(equipo.id)
                }
            });
            ctx.redirect(ctx.router.url('equipos'));
        }
        else if (ctx.request.body.drop1=="horarios"){
            await ctx.orm.equipo.update({ horarios  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(equipo.id)
                }
            });
            ctx.redirect(ctx.router.url('equipos'));
        }
        else if (ctx.request.body.drop1=="foto"){
            await ctx.orm.equipo.update({ foto  : ctx.request.body.cambio }, {
                where: {
                id: parseInt(equipo.id)
                }
            });
            ctx.redirect(ctx.router.url('equipos'));
        };
    } catch (error){
        await ctx.render('equipos/edit', {
            equipo : equipo,
            errors : error.errors,
            editEquiposPath :(id) =>  ctx.router.url('equipos-edit', id),
        }); 
    }
    
});



router.get('equipos-delete', '/delete/:id_eliminar', async (ctx) => {
    try{
        const id = ctx.state.id;
        await ctx.orm.equipo.destroy({
            where: {
              id: parseInt(id),
            }
          })
        ctx.redirect(ctx.router.url('equipos'));
    } catch (error){
        console.log("error")
        await ctx.render('equipos/delete', {
            errors : error.errors,
            deleteEquiposPath : (id) => ctx.router.url('equipos-delete', id),
        }); 
    }
});

router.get('equipos','/', async (ctx) => { 
    const equipos = await ctx.orm.equipo.findAll();
    for(let equipo of equipos){
        let a = await equipo.getDeporte();
        equipo.deporteId = a;
    };
    const deportes = await ctx.orm.deporte.findAll();
    await ctx.render('equipos/index', {
        equipos : equipos,
        equiposPath : (id) => ctx.router.url('equipo', id), 
        jwt,
        deleteEquiposPath : (id) => ctx.router.url('equipos-delete', id),
        newEquiposPath : ctx.router.url('equipos-new'),
        deportes: deportes,
        
    });
});



router.get('equipos-new','/new', (ctx) => { 
    const equipo = ctx.orm.equipo.build();
    return ctx.render('equipos/new', {
        equipo : equipo,
        createEquiposPath : ctx.router.url('equipos-create'),
    });
});

router.post('equipos-create','/', async (ctx) => { 
    if (ctx.request.body.foto == ''){
        ctx.request.body.foto = "https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
      } else {
        const foto = ctx.request.body.foto;
        ctx.request.body.foto = `https://team-patch.s3.amazonaws.com/${foto}`;
      }
    const equipo = ctx.orm.equipo.build(ctx.request.body);
    try{
        await equipo.save({ fields: PERMITED_FIELD});
        const equipo_user = ctx.orm.userequipo.build({
            equipoId: equipo.id,
            userId: equipo.capitan
        });
        await equipo_user.save();
        ctx.redirect(ctx.router.url('equipos'));
    } catch (error){
        await ctx.render('equipos/new', {
            equipo : equipo,
            errors : error.errors,
            createEquiposPath : ctx.router.url('equipos-create'),
        }); 
    }  
});

router.get('equipo','/:id', async (ctx) => { 
    const equipo = ctx.state.equipo;
    const user_id = parseInt(jwt.decode(ctx.state.currentUser.id, 'xxx'));
    const uid = jwt.decode(ctx.state.currentUser.id, 'xxx');
    const solicituds = await equipo.getSolicituds({where: {estado: 0}});
    for(let solicitud of solicituds){
        let a = await solicitud.getUser();
        solicitud.userId = a;
    }
    const reservas = await equipo.getReservas();
    for(let r of reservas){        
        let b = await ctx.orm.cancha.findByPk(r.canchaId);
        let c = await ctx.orm.recinto_deportivo.findByPk(b.recintoDeportivoId);
        r.equipoId = c;
        r.canchaId = b;
    }
    return ctx.render('equipos/show', {
        user_id : uid,
        equipo : equipo,
        capitan: await equipo.getUsers({where: {id: equipo.capitan}}),
        deporte: await ctx.orm.deporte.findByPk(equipo.deporteId),
        asociarEquipoPath : ctx.router.url('equipos-users'),
        updateEquiposPath :(id) => ctx.router.url('edit-equipos', id),
        users : await equipo.getUsers(),
        solicituds: solicituds,
        comprobacion: await equipo.countSolicituds({where: {userId: user_id, estado: 0}}),
        aceptado: await equipo.countUsers({where: {id: user_id}}),
        aceptarPath : ctx.router.url('aceptar'),
        rechazarPath : ctx.router.url('rechazar'),
        reservas : reservas,
    });
});

module.exports = router;
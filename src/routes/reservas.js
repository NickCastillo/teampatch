const KoaRouter = require('koa-router');
var jwt = require("jwt-simple");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

const router = new KoaRouter();

const PERMITED_FIELD = [
    'fecha',
    'hora',
    'canchaId',
    'equipoId',
    'estado',
];
router.param('id', async (id, ctx, next) => {
    const nid = jwt.decode(id, 'xxx');
    const equipo = await ctx.orm.equipo.findByPk(nid);
    ctx.state.equipo = equipo;
    return next();
});


router.post('reserva-create','/', async (ctx) => { 
    console.log(ctx.request.body);
    console.log(ctx.request.body.fecha);
    const cancha = await ctx.orm.cancha.findByPk(ctx.request.body.canchaId);
    const equipos = await ctx.orm.equipo.findAll({where: {capitan: jwt.decode(ctx.session.current_user.id, 'xxx')}});
    const reservas = await ctx.orm.reserva.findAll({
        where: {
            [Op.and]: [
                {hora: ctx.request.body.hora},
                {fecha: ctx.request.body.fecha},
                {[Op.or]: [
                    {estado: 1},
                    {estado: 2},
                ]},
            ]
        }
    });
    const reserva = ctx.orm.reserva.build(ctx.request.body);
    try{
        if(reservas.length != 0){
            canchas-ocupadas;
        }  
        await reserva.save({ fields: PERMITED_FIELD});
        await ctx.render('canchas/show', {
            aviso: 1,
            equipos,
            cancha,
            reserva,
            createReservaPath : ctx.router.url('reserva-create'),
            updateCanchasPath :(id) => ctx.router.url('edit-canchas', id),
            createEquiposPath : ctx.router.url('equipos-create'),
        }); 
    } catch (error){
        await ctx.render('canchas/show', {
            aviso: -1,
            equipos,
            cancha,
            reserva,
            createReservaPath : ctx.router.url('reserva-create'),
            updateCanchasPath :(id) => ctx.router.url('edit-canchas', id),
            createEquiposPath : ctx.router.url('equipos-create'),
        }); 
    }  
});

router.get('mis.reservas', '/filter', async (ctx) => {
    const id = parseInt(jwt.decode(ctx.state.currentRecinto.id, 'xxx'));
    const recinto = await ctx.orm.recinto_deportivo.findByPk(id);
    const canchas = await recinto.getCanchas();
    let total = [];
    for( let cancha of canchas){
        let reservas = await cancha.getReservas({where: {estado: 1}});
        for(let r of reservas){        
            r.canchaId = cancha;
        }
        
        if(reservas.length != 0){
            total = total.concat(reservas);
        }
        
    }
    await ctx.render('reservas/filter', {
        reservas: total,
        aceptarPath : ctx.router.url('aceptar-reserva'),
        rechazarPath : ctx.router.url('rechazar-reserva'),
        
    });
  });

  router.patch('aceptar-reserva','/aceptar', async (ctx) => { 
    const reserva_id = parseInt(ctx.request.body.reserva_id);
    console.log("AASDASDSAS");
    console.log(reserva_id);
    console.log("AASDASDSAS");
    await ctx.orm.reserva.update({ estado  : 2 }, {
        where: {
        id: reserva_id,
        }
    });
    ctx.redirect(ctx.router.url('mis.reservas'));

});

router.patch('rechazar-reserva','/rechazar', async (ctx) => { 
    const reserva_id = parseInt(ctx.request.body.reserva_id);
    console.log("AASDASDSAS");
    console.log(reserva_id);
    console.log("AASDASDSAS");
    await ctx.orm.reserva.update({ estado  : 0 }, {
        where: {
            id: reserva_id,
        }
    });
    
    ctx.redirect(ctx.router.url('mis.reservas'));
});
module.exports = router;
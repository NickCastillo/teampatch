const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');

const partidos = require('./routes/partidos')
const equipos = require('./routes/equipos');
const deportes = require('./routes/deportes');
const mensajes = require('./routes/mensajes');
const solicituds = require('./routes/solicituds');
const users = require('./routes/users');
const recinto_deportivos = require('./routes/recinto_deportivos');
const comentarios = require('./routes/comentarios');
const canchas = require('./routes/canchas');
const session = require('./routes/session');
const reservas = require('./routes/reservas');
const jwt = require("jwt-simple");
const router = new KoaRouter();


router.use(async (ctx, next) => {

    if (ctx.session.current_user){
        ctx.state.currentUser = ctx.session.current_user;
    }
    if (ctx.session.current_recinto){
        ctx.state.currentRecinto = ctx.session.current_recinto;
    }

    Object.assign(ctx.state, {

        currentUser: ctx.session.current_user,
        currentRecinto: ctx.session.current_recinto,
        destroySessionPath: ctx.router.url("session-destroy"),
    });

    return next();
});


router.use('/session', session.routes());

router.use('/', index.routes());
router.use('/hello', hello.routes());

router.use('/partidos', partidos.routes());
router.use('/equipos', equipos.routes());
router.use('/deportes', deportes.routes());

router.use('/mensajes', mensajes.routes());
router.use('/solicituds', solicituds.routes());
router.use('/users', users.routes());

router.use('/recinto_deportivos', recinto_deportivos.routes());
router.use('/comentarios', comentarios.routes());
router.use('/canchas', canchas.routes());
router.use('/reservas', reservas.routes());


module.exports = router;

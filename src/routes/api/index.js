const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const auth = require('./auth');
const users = require('./users');
const recinto_deportivos = require('./recinto_deportivos');

const router = new KoaRouter({ prefix: '/api' });

router.get('/', async (ctx) => {
    ctx.status = 200;
    ctx.body = { message: 'TeamPatch API'}
});


router.use('/auth', auth.routes());

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'jwtDecoded' }))

router.use('/users', users.routes());
router.use('/recinto_deportivos', recinto_deportivos.routes());

module.exports = router; 
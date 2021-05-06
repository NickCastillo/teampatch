const KoaRouter = require('koa-router');
const pkg = require('../../package.json');
var jwt = require("jwt-simple");

const router = new KoaRouter();

const PATHS = [
  '/log_in',
];


router.get('/',  async (ctx) => {
  const users = await ctx.orm.user.findAll();
  const recintos_deportivos = await ctx.orm.recinto_deportivo.findAll();
  await ctx.render('index', { 
    users,
    jwt,
    recintos_deportivos,
    userPath: (id) => ctx.router.url('user', id),
    recinto_deportivoPath: (id) => ctx.router.url('recinto_deportivo', id),
    chatPath: (id, id2) => ctx.router.url('mensaje', id, id2)});
});

router.get('log_in', 'log_in', async (ctx) => {
  await ctx.render('log_in');
});

router.get('sign_up', 'sign_up', async (ctx) => {
  await ctx.render('sign_up');
});

router.get('404', '404', async (ctx) => {
  await ctx.render('404');
});

router.get('500', '500', async (ctx) => {
  await ctx.render('500');
});

router.get('other_error', 'other_error', async (ctx) => {
  await ctx.render('other_error');
});


module.exports = router;

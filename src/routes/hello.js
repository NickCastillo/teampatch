const KoaRouter = require('koa-router');
const sendExampleEmail = require('../mailers/example');
var jwt = require("jwt-simple");


const router = new KoaRouter();

router.get('hello', '/', async (ctx) => {
  await ctx.render('hello/index', {
    nameUrl: (name) => ctx.router.url('hello.name', name),
    notice: ctx.flashMessage.notice,
  });
});

router.post('hello', '/', async (ctx) => {
  ctx.flashMessage.notice = 'Form successfully processed';
 
    await sendExampleEmail(ctx, ctx.request.body);

  ctx.redirect(ctx.router.url('hello'));
});

router.get('hello.name', '/:name', (ctx) => {
  ctx.body = { message: `Hello ${ctx.params.name}!` };
});

module.exports = router;

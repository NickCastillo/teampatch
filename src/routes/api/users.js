const KoaRouter = require('koa-router');


const router = new KoaRouter();

router.get('user-data', '/me', async (ctx) => {
    console.log(ctx.state)
    const {jwtDecoded: { sub } } = ctx.state
    const user = await ctx.orm.user.findByPk(sub);
    ctx.body = { user };
});

module.exports = router;
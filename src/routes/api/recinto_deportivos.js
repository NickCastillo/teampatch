const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('user-data', '/', async (ctx) => {
    const recintos_deportivos = await ctx.orm.recinto_deportivo.findAll();
    console.log('acaa')
    const {jwtDecoded: { sub } } = ctx.state;
    const user = await ctx.orm.user.findByPk(sub);
    
    if (user){
        ctx.status = 200;
        ctx.body = {recintos_deportivos: recintos_deportivos};
    } else {
        ctx.status = 400;
        ctx.body = {message: 'Authentication Error'};
    }
   
});

module.exports = router;
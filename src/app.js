const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaFlashMessage = require('koa-flash-message').default;
const koaStatic = require('koa-static');
const render = require('koa-ejs');
const session = require('koa-session');
const override = require('koa-override-method');
const assets = require('./assets');
const mailer = require('./mailers');
const routes = require('./routes');
const apiRoutes = require('./routes/api');
const orm = require('./models');
const s3 = require('./routes/uploadFile');

const app = new Koa();

app.use(async(ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
        ctx.throw(404)
    }
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    if (ctx.status === 404) {
      ctx.redirect(ctx.router.url('404'));
    } else if (ctx.status === 500){
      ctx.redirect(ctx.router.url('500'));
    } else {
      ctx.redirect(ctx.router.url('other_error'));
    }
  }
})

const developmentMode = app.env === 'development';
const testMode = app.env === 'test';

app.keys = [
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  'saying he is logged in when it\'s really not',
];

app.context.orm = orm;


app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});


if (!testMode) {
  app.use(koaLogger());
}

if (developmentMode) {
  const koaWebpack = require('koa-webpack');
  koaWebpack()
    .then((middleware) => app.use(middleware))
    .catch(console.error); // eslint-disable-line no-console
}

app.use(koaStatic(path.join(__dirname, '..', 'build'), {}));
app.use(koaStatic(path.join(__dirname, 'static')));
app.use(koaStatic(path.join(__dirname, '/assets')));

app.use(session({
  maxAge: 14 * 24 * 60 * 60 * 1000,
}, app));

app.use(koaFlashMessage);

app.use(koaBody({
  multipart: true,
  keepExtensions: true,
}));

app.use((ctx, next) => {
  ctx.request.method = override.call(ctx, ctx.request.body.fields || ctx.request.body);
  return next();
});

console.log("Going into views");
app.use(assets(developmentMode));
render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'html.ejs',
  cache: !developmentMode,
});

mailer(app);

routes.post("/upload", async ctx => {
  const file = ctx.request.files.file;
  const { key, url } = await s3.uploadFile({
    fileName: file.name,
    filePath: file.path,
    fileType: file.type,
  });
  ctx.body = { key, url };
});

console.log("Going into routing middleware");
app.use(routes.routes());
app.use(apiRoutes.routes());
app.use(koaBody({ multipart: true }));
app.use(routes.allowedMethods());

module.exports = app;

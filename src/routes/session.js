const bcrypt = require('bcrypt');
const KoaRouter = require('koa-router');
var jwt = require("jwt-simple");


var jwt = require("jwt-simple");
const { NULL } = require('node-sass');


const router = new KoaRouter();

router.get("session-new-user", "/new-user", (ctx) =>
  ctx.render("session/new", {
    createSessionPath: ctx.router.url("session-create-user")
})
);

router.get("session-new-recinto", "/new-recinto", (ctx) =>
  ctx.render("session/new", {
    createSessionPath: ctx.router.url("session-create-recinto")
})
);

router.post("session-create-user", "/user", async (ctx) => {
  const { correo, contrasena} = ctx.request.body;
  console.log(correo, contrasena);
  let pass = "";
  let usuario = "";  
  usuario = await ctx.orm.user.findOne({ where: { correo } });
  
  if (!usuario) ctx.throw(422);
  
  if (usuario!=null){
    console.log("usuario encontrado");
    const authenticated = await bcrypt.compare(contrasena, usuario.contrasena);

    if (usuario && authenticated) {
      var token = {};
      token.id = jwt.encode(usuario.id, 'xxx');
      token.nombre = usuario.nombre;
      token.correo = usuario.correo;
      token.foto = usuario.foto;
      token.username = usuario.username;
      token.telefono = usuario.telefono;
      token.contrasena = usuario.contrasena;
      token.admin = usuario.admin;
      token.jefe = usuario.jefe;
      ctx.session.current_user = token;
      console.log('Redireccionando...');

      switch (ctx.accepts(['html', 'json'])) {
        case 'html':
          console.log('html')
          ctx.redirect("/");
          break
          
        case 'json':
          console.log('json')
          ctx.status = 302;
          ctx.body = {message: 'Agregado y redireccionando'};
          break
        
        default:
          ctx.throw(406);
          break
      }
      
    } else {
        console.log('Usuario y/o contraseña incorrectos');
        await ctx.render("session/new", {
          error: 'Usuario y/o contraseña incorrectos',
          createSessionPath: ctx.router.url("session-create-user")
        })
      }
    } else {
        console.log('Usuario y/o contraseña incorrectos');
        await ctx.render("session/new", {
          error: 'Usuario y/o contraseña incorrectos',
          createSessionPath: ctx.router.url("session-create-user")
      })
    }
});

router.post("session-create-recinto", "/recinto", async (ctx) => {
  const { correo, contrasena} = ctx.request.body;
  let usuario = "";
  usuario = await ctx.orm.recinto_deportivo.findOne({ where: { correo } });
  
  if (usuario!=null){
    console.log("usuario encontrado", usuario.correo);
    const authenticated = await bcrypt.compare(contrasena, usuario.contrasena);

  if (usuario && authenticated) {
    var token = {};
    token.id = jwt.encode(usuario.id, 'xxx');
    token.nombre = usuario.nombre;
    token.correo = usuario.correo;
    token.foto = usuario.foto;
    token.bio = usuario.bio;
    token.telefono = usuario.telefono;
    token.contrasena = usuario.contrasena;
    token.ubicacion = usuario.ubicacion;
    token.n_canchas = usuario.n_canchas;
    ctx.session.current_recinto = token;
    console.log('Redireccionando...');
    
    switch (ctx.accepts(['html', 'json'])) {
      case 'html':
        console.log('html')
        ctx.redirect("/");
        break
        
      case 'json':
        console.log('json')
        ctx.status = 302;
        ctx.body = {message: 'Agregado y redireccionando'};
        break
      
      default:
        ctx.throw(406);
        break
    }

  } else {
    await ctx.render("session/new", {
    error: 'Usuario y/o contraseña incorrectos',
    createSessionPath: ctx.router.url("session-create-recinto")
      }
    )}
  } else {
    await ctx.render("session/new", {
      error: 'Usuario y/o contraseña incorrectos',
      createSessionPath: ctx.router.url("session-create-recinto")
    }
    )}
  });

router.delete("session-destroy", "/delete", (ctx) =>{

  ctx.session.current_user = undefined;
  ctx.session.current_recinto = undefined;

  return ctx.redirect("/");
}
);

module.exports = router;

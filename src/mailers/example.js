module.exports = function sendExampleEmail(ctx, data) {
  const {username} = data;
  return ctx.sendMail('example-email', { 
    to: data,
    subject: "Bienvenido a TeamPatch",
  }, { data });
};

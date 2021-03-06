require('dotenv').config()
module.exports = {
  provider: {
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS,
    },
  },
  defaults: {
    from: 'template <crvargasu@gmail.com>',
  },
};

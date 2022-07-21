var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function (req, res, next) {
  res.render('contacto', {
    isContacto: true
  });
})

router.post('/', async function (req, res, next) {
  // console.log(req.body)
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var comentarios = req.body.comentarios;

  var obj = {
    to: 'damianbarzolaweb@gmail.com',
    subject: 'contacto desde la pagina web',
    html: nombre + ", tel: " + tel + " , se contacto a traves de la web y dejo el siguiente mensaje: " + comentarios + "."
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
}) // finaliza el transport


  var info = await transport.sendMail(obj);

  res.render('contacto', {
    message: 'Mensaje enviado correctamente',
    isContacto: true
  });

})

module.exports = router;
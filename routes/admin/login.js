var express = require('express');
var router = express.Router();
var usuariosModels = require ('./../../models/usuariosModels')

router.get('/',function (req, res, next){
    res.render('admin/login', {
        layout:'admin/layout'
    });
});

router.get('/logout', function(req,res,next){
    req.session.destroy(); //destruye id, nombre, 
    res.render('admin/login',{
        layout:'admin/layout'
    })
})

router.post('/', async function(req,res,next){

    try{
        console.log(req.body);
        var usuario = req.body.user;
        var password = req.body.password;


        var data = await usuariosModels.getUserAndPassword(usuario,password);

        console.log(data)

        if(data != undefined){
            req.session.id_usuario = data.id;
            req.session.nombre = data.user;

            console.log(req.session.id_usuario);

            res.redirect('/admin/novedades')
        } else{
            res.render('admin/login',{
                layout:'admin/layout',
                error:true
            })
        }


    }catch(error){
        console.log(error)
    }
})

module.exports = router;
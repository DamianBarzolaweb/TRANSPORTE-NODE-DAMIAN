var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModels');

router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedades
    });
});

router.get('/agregar', (req,res,next) =>{
    res.render('admin/agregar',{
        layout: 'admin/layout'
    })
})

router.post('/agregar', async (req,res,next) =>{
    try{
        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await novedadesModel.insertNovedades(req.body);
            res.redirect('/admin/novedades')
        } else{
            res.render('admin/agregar',{
                layout:'admin/layout',
                error:true,
                message:'Todos los campos son requeridos'
            })
        }
    }catch(error){
        console.log(error)
        res.render('admin/agregar',{
            layout:'admin/layout',
            error:true,
            message:'No fue capaz de cargar la novedad'
        })
    }
})

router.get('/eliminar/:id', async (req,res,next) =>{
    var id = req.params.id;
    await novedadesModel.deleteNovedadesByID(id);
    res.redirect('/admin/novedades');

})

router.get('/modificar/:id', async(req,res,next) =>{
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesByID(id);
    res.render('admin/modificar',{
        layout: 'admin/layout',
        novedad
    })
})

module.exports = router;
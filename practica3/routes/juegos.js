//importamos las librerias necesarias
const express = require("express");
const multer = require('multer');

//importamos el modelo
let juego = require(__dirname+"/../models/juego.js");

let router = express.Router();

//importamos el método que comprueba que la sesión esté iniciada
let auth=require(__dirname+"/../utils/auth");

//declaramos un mensaje genérico de error
let message="error en la aplicación";

//configuramos multer para guardar archivos subidos
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
  cb(null, Date.now() + "_" + file.originalname)
  }
  })

let upload = multer({storage: storage});


//ruta que muestra todos los juegos. Primero encuentra todos los juegos, luego los envia por parametro a la vista
router.get('/', auth, (req, res) => {
  juego.find()
  .then(resultado=>res.render("administracion/admin_juegos", {juegos:resultado}))
  .catch(
    error => {
      res.render ('administracion/admin_error', {mensaje: message})}
  );

}); 


//renderiza el formulario para insertar un nuevo juego
router.get('/nuevo', auth, (req, res) => {
   
  res.render ('administracion/admin_juegos_form').catch(error => {res.render ('administracion/admin_error', {mensaje: message})})

}); 

//ruta que edita la edición de los juegos
router.get('/editar/edicion/:id/', (req, res)=>
{
  
  juego.findById(req.params.id).then(resultado => {
    if(resultado!=null)
    {  
    ediciones=resultado.ediciones;
    res.render ('administracion/admin_edicion_form',
     {ediciones: ediciones, idjuego:req.params.id}) 
    }
    else
    {
      let message="juego no encontrado";
      res.render ('administracion/admin_error',
      {mensaje: message})

    }
  }).catch(
    error => {
      res.render ('administracion/admin_error', {mensaje: message})}
  );
})

//Renderiza la vista del formulario pasando por parametro el id
router.get('/editar/:id', auth, (req, res) => {
   
  juego.findById(req.params.id).then(resultado => {
    if(resultado!=null)
    {  
    res.render ('administracion/admin_juegos_form',
     {juegos: resultado}) 
    }
    else
    {
      let message="juego no encontrado";
      res.render ('administracion/admin_error',
      {mensaje: message})

    }


    }).catch (error => {
      res.render ('administracion/admin_error', {mensaje: message})})

});


//ruta que recoge la petición de los datos del juego nuevo
router.post("/", auth,  upload.single('img'), (req, res) => {
 
  
    let nuevoJuego = new juego({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      img:req.file.filename,
      edad: req.body.edad,
      tipo: req.body.tipo,
      precio: req.body.precio,
      imagen: req.body.imagen,
      jugadores:req.body.jugadores,
    });
    nuevoJuego
      .save()
      .then((resultado) => {
       res.redirect(req.baseUrl);
      })
      .catch(error => {
        message="error al insertar el juego";
  res.render ('administracion/admin_error', {mensaje: message})})
     
});




//recoge los datos del formulario al editar el juego
router.post("/:id", auth,  upload.single('img'), (req, res)=>{
  
juego.findByIdAndUpdate(req.params.id,
   {$set:{
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      edad: req.body.edad,
      tipo: req.body.tipo,
      precio: req.body.precio,
      jugadores:req.body.jugadores,
      img:req.body.filename
    
    }},{new:true}
    ).then(resultado=>
      {

        res.render ('administracion/juegos')
        

      }
      
      
      ).then( res.redirect(req.baseUrl))
  .catch(error=>
     { 
      res.render ('administracion/admin_error', {mensaje: message})
    }
     )
})


//borrar
router.delete('/:id',  auth, (req, res) => {
   
  
  juego.findOneAndRemove({id: req.params.id})
.then(
  res.redirect(req.baseUrl)
).catch (error => {
  res.render ('administracion/admin_error', {mensaje: message})
});

}); 



router.get('/editar/edicion/:id/:idEdicion', (req, res)=>
{

  
  juego.findById(req.params.id).then(resultado => {
    if(resultado!=null)
    {  
  
    edicionEditar=resultado.ediciones.filter(edicion=>edicion.id==req.params.idEdicion)[0];
   
    res.render ('administracion/admin_edicion_form',
     {edicionEditar: edicionEditar, idjuego:req.params.id}) 
    }
    else
    {
      let message="juego no encontrado";
      res.render ('administracion/admin_error',
      {mensaje: message})

    }



})})

//ruta que edita la edición del juego
router.post('/editar/edicion/:id/',  (req, res)=>
{
 
  juego.findById(req.params.id).then(resultado => {

    //buscamos el juego y si existe insertamos la edición
    if(resultado!=null)
    {  
     
    resultado.ediciones.push({nombre:req.body.nombre, anyo:req.body.anyo});
    resultado.save().then(resultado=>res.render ('publico/publico_juego', {juego:resultado}));
    
    
    }
    else
    {
      //si no existe entonces entonces enviamos mensaje de error
      let message="juego no encontrado";
      res.render ('administracion/admin_error',
      {mensaje: message})

    }
  }).catch(error=>res.render("publico/publico_error"));



})



  module.exports = router;
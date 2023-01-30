//importamos express
const express = require("express");

//importamos el modelo
let juego = require(__dirname+"/../models/juego.js");

let router = express.Router();


//declaramos un mensaje de error generico.
let message="error en la aplicación";

//renderiza el index de la aplicación.
router.get('/', (req, res) => {
   
    res.render ('publico/publico_index');

}); 

//busca juegos coincidentes
router.get('/buscar', (req, res) => {
//para buscar empleamos una expresion regular para que busque en el nombre la cadena que pasamos en el input
    juego.find({nombre:{ "$regex":  req.query["nombre"], "$options": "i" }})
    .then(resultado=> 
       {
           if(resultado.length>0){   
           res.render("publico/publico_index", {juegos:resultado})
           }
           else
           {
               
               let message="resultados no encontrados"
               res.render("publico/publico_index", {mensaje:message, juegos:resultado})
   
           }
       
       }).catch(error=> res.render("publico/publico_error", {mensaje:message}) )});


//renderiza la ficha del juego de mesa pasando por parametro la id del mismo. 
router.get('/juegos/:id', (req, res) => {
   
    let message="juego no encontrado";
        juego.findById(req.params.id).then(resultado => {
           

           if(resultado!=null){
            res.render ('publico/publico_juego', {juego: resultado})
           }
           else
           {    
                res.render("publico/publico_error", {mensaje:message});


           }
            
          
            }
             ).catch(err=>res.render("publico/publico_error", {mensaje:message}))
    

}); 



module.exports = router;
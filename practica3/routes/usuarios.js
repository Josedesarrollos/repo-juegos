const express = require("express");
let usuarios = require(__dirname+"/../models/usuario.js");
let router = express.Router();
const bcrypt = require('bcrypt');

//ruta que renderiza auth_login
router.get('/', (req, res) =>
 { 
    res.render ('autenticacion/auth_login')

});

//ruta que recibe los datos del formulario y busca el usuario y la contraseña
router.post('/', (req, res) =>
 { 

    let login=req.body.login;
    let password = req.body.password;
    

    
    usuarios.find().then(usuariosArray=>{
        usuario=usuariosArray.filter(
            
            usuario=>(usuario.login==login));
     //si el array es mayor que cero, entonces renderizamos la vista del index
        if(usuario.length>0)
        {   
            bcrypt.compare(password, usuario[0].password, function(err, result) {
    
                if(result==true){
            req.session.usuario=usuario[0].login;
           
            res.render('publico/publico_index');   
        }
        else
        {

            //si no, damos valor a la variable mensaje de contraseña incorrecta:
            let message="contraseña incorrecta";
            res.render("autenticacion/auth_login", {mensaje:message});

        }
            });
           
            
        }
        else
        {
            let mensaje="usuario no encontrado";
            res.render("autenticacion/auth_login", {mensaje:mensaje});


        }
       
    
    }
       
            
            
            ).catch(error=>res.render("publico/publico_error"));
    

});

//ruta que destruye la sesión del usuario y redirecciona al raiz
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
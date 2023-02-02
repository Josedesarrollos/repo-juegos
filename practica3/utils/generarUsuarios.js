const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require(__dirname + '/../models/usuario');
mongoose.connect('mongodb://127.0.0.1:27017/juegosPracticaFinal');

//usuario 1:

//encriptar contraseña


Usuario.find().then(resultado => {
   if(resultado.length>0)
   {



   }
   else
   {

    pass="12345678";
    const saltRounds = 10;
    
    bcrypt.hash(pass, saltRounds, function(err, hash) {
      
        let usu1 = new Usuario({
            login: 'maycalle',
            password: hash
           });
           usu1.save();
    
    })


   }
  



}).catch (error => {
    console.log("ERROR:", error);
   });
   






/*
let usu2 = new Usuario({
 login: 'rosamaria',
 password: '87654321'
});
usu2.save();*/
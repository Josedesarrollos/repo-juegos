const mongoose = require('mongoose');

let usuarioschema=mongoose.Schema(
    {

        login:
        {
            type:String,
            minlenght:5,
            unique:true


        },
        password:
        {
            type:String,
            minlenght:8



        }



    })

    let usuarios = mongoose.model('usuarios', usuarioschema);

module.exports = usuarios;
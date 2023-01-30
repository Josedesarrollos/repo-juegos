const mongoose = require('mongoose');
const ediciones=require('./ediciones');

let juegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    descripcion:
    {
        type:String,
        required:true
    },
    edad:
    {
        type:Number,
        min:0,
        max:100


    },
    tipo:
    {
        type:String,
        enum:['rol', 'escape', 'dados', 'fichas', 'cartas', 'tablero']


    },
    precio:
    {   
        type:Number,
        min:0,
        required:true

    },
   img:{

    type:String, 
    required:false

   },
   jugadores:
   {
    type:String,
    required:true

   },
    
  
    ediciones:[ediciones]


});

let Juegos = mongoose.model('juego', juegoSchema);

module.exports = Juegos;
//cargamos librerias necesarias
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const session=require('express-session');
const methodOverride=require('method-override');

mongoose.connect('mongodb://mongodb:27017/juegosPractica43');
//iniciamos los usuarios
const generarusuarios=require(__dirname +"/utils/generarUsuarios");
//importamos el directorio de rutas
const juegos = require(__dirname + '/routes/juegos');
const usuarios=require(__dirname + '/routes/usuarios');
const publico=require(__dirname + '/routes/publico');

//conectamos a la base de datos
//iniciamos express
let app=express();


//configuramos el motor de plantillas
nunjucks.configure(__dirname+'/views', {

    autoescape: true,
    express: app


});
app.set('view engine', 'njk');

//hacemos publicas las imagenes para que se puedan mostrar
app.use("/images", express.static(__dirname+"/public/uploads"));
//incorporamos el bootstrap como contenido estatico
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public/css'))
//configuramos la sesion
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
   }));

   app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
   });

app.use(express.json());




   


app.use(bodyParser.urlencoded());

//middleware que nos permite sobreescribir los fetodos de los formularios
app.use(methodOverride(function (req, res) 
{
    if (req.body && typeof req.body === 'object'    && '_method' in req.body) 
    {

    let method = req.body._method;
    delete req.body._method;
    return method;
    
    } 
   }));

//aplicamos el middleware

//enrutadores
app.use('/usuarios',usuarios);
app.use('/juegos',juegos);
app.use('/', publico);

app.listen(8086);
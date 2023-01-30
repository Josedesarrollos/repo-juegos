
//metodo que comprueba si el usuario ha iniciado sesión
let autenticacion = (req, res, next) => {
    if (req.session && req.session.usuario)
    return next();
    else
    res.render('autenticacion/auth_login');
   };
     

//exportamos el metodo.
module.exports=autenticacion;
const mongoose = require('mongoose');
currentTime = new Date();
let edicionschema = new mongoose.Schema({
  
nombre:
{
type:String,
require:true



},
anyo:
{
type:Number,
min:2000,


max:currentTime.getFullYear()


}



});

module.exports=edicionschema;
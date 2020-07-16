//este archivo tendra la estructura que guardare de los usuarios, es decir los datos que estare guardando. Lo primero sera requerir desde mongoose el metodo Schema y el metodo model

const{Schema,model}=require('mongoose');

const userSchema= new Schema({
    email: String,
    password:String
},{
    timestamps:true
    //esto es para agregar automaticamente dos campos mas al modelo, uno llamado createdAt y updatedAt 
})
//una vez definido el esquema podre crear un modelo, esto lo puedo hacer ejecutando la funcion model la cual recibe dos cosas , el nombre del modelo y el esquema en el cual estara basado. por ejemplo creare un modelo para un usuario que estara basado en un mi userSchema que he definido. 
module.exports= model('User', userSchema); 
//gracias a esto ya podre guardar, consultar, borrar y agregar datos. Como voy a usarlo en otras partes de mi app debia poder exportatrlo 


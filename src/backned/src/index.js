//ARCHIVO PRINCIPAL DEL BACKEND
const express= require('express');
const app=express();
const cors=require('cors');
//******************************************************** desde aqui*/
const morgan =require('morgan')
//Meddleware
app.use(morgan('dev'));
app.use(express.json())
//*******************************************************  hasta aqui*/




require('./database');

//cors para conectar los servidores del front y el back
app.use(cors())
//este metodo extraido de express(.json) permite convertir los datos que esta recibiendo el servidor a un objeto de javaScript que voy a poder manipular
app.use(express.json());

app.use(require('./routes/index'));

app.listen(3000);
console.log('Servidor a la escucha en el puerto', 3000)
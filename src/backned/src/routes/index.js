const{Router}= require('express');
//Este objeto router me servira para poder definir Urls
const router= Router();
//con esto puedo hare un consultya a la base de de datos pq tiene el modelo de datos.
const Employee= require('../models/employee');

const{Mongoose}= require('../database')


//Importare el modelo del usuario(Users desde la carpeta que lo contiene) ya que estare usando la interaccion con la base de datos para guardarlos dentros dentro de ellas para consultgar luego si ese usuario existe, para guardar la contraceña. Una vez importado ya puedo inetractuar con la DB
const User=require('../models/Users');

const jwt=require('jsonwebtoken');
const { resolveTxt } = require('dns');


//********************Areas de la TAREAS CRUD  ******************+ */
//Ver las tareas (GET)
router.get('/api/getTareas', async(req,res)=>{
   const employees= await Employee.find();
   res.json(employees);
})
//guardar tarea(POST)
router.post('/api/guardaTareas', async(req,res)=>{
   
    const  {name,task,date}=req.body;
    const newTask= new User({name,task,date});
    await newTask.save(); 

   console.log(req.body);
   res.json('recibido')
})
//Pedir datos de una sola tarea (GET)
router.get('/api/getTarea/:id',(req,res)=>{

})

//ACTUALIZAR datos de una sola tarea (PUT)
router.put('/api/editTarea/:id',(req,res)=>{

});
//BORRAR tarea (DELETE)
router.put('/api/deleteTarea/:id',(req,res)=>{

});

//*****HASTA ACA RUTAS DE TAREAS O *******Areas de retas de tareas que mal llame employees */

//1.-Ruta inicial(GET)
router.get('/',(req,res)=>res.send('Hola mundo'));

//2.-Ruta para registrar un usuario (POST)
router.post('/api/signup',async(req,res)=>{
    //console.log(req.body)
    //con la siguiente linea extraigo el correo y la contraceña enviados desde el frontend
    const  {email,password}=req.body;
    //procedo a CREAR UN NUEVO USUARIO y los datos que necesita es un correo y un password  con los parametros que me estan pasando,informacion que sera guardada eun una constante llamada newUser 
    const newUser= new User({email,password});
    //si lo veo por consola
    //console.log(newUser);
    //para AGREGAR el newUser a la base de datos unos .save(), pero este metodo es asincrono ya que necesita sierto tiempo para afectar la base de datpsse de datos 
    await newUser.save(); 
    //una vez gusrdado elUsuarios en la DB, quiero devolver un token en foerma de un id que el usuario podra guardar y gracias a ese id podra seguir pidiendo cosas diferentes dentro del servidor.El procedimieto es necesito requerir el modulo que fue instalado previamente en jsonpackage llamado jsonwebtoken y lo guardare en una constante jwt. el cual posee un metodo sign()el cual maneja 3 parametros(1 payload o el dato que quiero guardar (_id deñ usuario), 2 secre o palabra secreta, 3 opciones)
console.log(newUser)
    const token= jwt.sign({_id:newUser.id},'secretkey');
    //devolviendo el token al cliente despues de ser generado
    res.status(200).json({token})
})

//3.-Volver a logearse o signin
router.post('/api/signin', async (req,res)=>{
    //lo pirmero que hace este metodo es recibe desde req.body un correo y una contraceña(email y password) ya que el usuario tendra que volver a enviar el correo y la contraceña para validarlo desde el backend, por tanto buscare por corre 
    const {email,password}=req.body;
    //ahora buscare el correo, desede el modelo User, y si lo encuentra guardalo en una constante llamada user
    const user=await User.findOne({email});
    //validacion: sino encuentra el usuario retornare un codido (401)
    if(!user)return res.status(401).send("email no encontrado");
    //pasado este punto indica que el correo era correcto y lo siguiente a validar es la contraceña
    if(user.password !==password) return res.status(401).send("Contraseña invalida");
    //pasado este punto indica que sus datos son correctos y le puedo devolver un token 
    const token= jwt.sign({_id:user._id},'secretkey');
    //esto es lo que devolvere cuando el usuario haga un loggin
    return res.status(200).json({token});
    //hasta este punto solo estoy devolviendo un token al unsiario ya sea cuando se registra o cuando de logea, luego entonces creare dos rutas mas para poder devoler datos 
});

//4.-Ruta para devolver datos publicos(GET), luego entonces cuando se visite esta ruta el servidor respondera con el arreglos de las tareas que el usuario necesite en googlekeep, mediante un arreglo de json,el cual contendra miltple objetos que tendran un _id, name,description y un date.Esta ruta sera de DATOS PUBLICOS es decir no es necesario autenticarse para acceder a ellos 
router.get('/api/tasks',(req,res)=>{
    res.json([
        {
             _id:1,
             name:'Tarea 1',
             description:'loren ipsum',
             date:"22/01/80"
        },
        {
            _id:2,
            name:'Tarea 2',
            description:'loren ipsum',
            date:"22/01/80"
        },
        {
            _id:3,
            name:'Tarea 3',
            description:'loren ipsum',
            date:"22/01/80"
        }
    ])
})

//5.-Ruta para similar datos privados(GET):obtiene los mismos datos anteriores pero primero debe auntenticarse
router.get('/api/private-tasks',verifyToken,(req,res)=>{
    res.json([
        {
             _id:1,
             name:'Tarea 1',
             description:'loren ipsum',
             date:"22/01/80"
        },
        {
            _id:2,
            name:'Tarea 2',
            description:'loren ipsum',
            date:"22/01/80"
        },
        {
            _id:3,
            name:'Tarea 3',
            description:'loren ipsum',
            date:"22/01/80"
        }
    ])
})


module.exports=router;

//funcion de verificacion: esta verificara en cada ruta el token, si existe dicho token continuara con el proceso tipico de la ruta especifica, y si no existe el token envia un mensaje de error diciendole al usuario que no esta autorizado a solicitar esos datos, por tanto se pasara esta funcion dentro de cada ruta. Recicira como es una ruta un req, un res y un next(ya que sera utilizada desde el enrutador de express).
function verifyToken(req,res,next){
    //si no tienes una cabezera no puede obtener los datos de la ruta que esta visitando, por tanto retorna un res.status(401).send('Peticion no autorizada')
    console.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(401).send('Peticion no autorizada');
    }
    //pasado este puento indica que si tengo autorizacion, lo siguiente es comprobar el token, pero por defecto el la cabecera antes del token se escribe pa palbra  BEARER(Bearer lo cual es un standar al momento de enviar el token), es decir cada vez que se use el token para enviar en cada peticion para enviar al servidor datos privados debo enviar una CABECERA (Header) llamada (authorization) y como VALOR  el texto (Bearer) un espacio y el token obtenido...

    //const token=req.headers.authorization.split('')[1];
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
      
    //console.log(token);
    
    //por tanto el servidor recibira la pabra Bearer mas el token, pero solo me intereza el token y por tanto debo sepaarlos con la funcion.split(), al ser un strin dividita el contenido creando un item para la palabra Bearer y otro para el token , esto lo guardare en un array y requerire la posicion [1] que es el token, para luego cuargar este valor en una variable llamada token.....luego entonces a continuacion verifico si el token esta vacio (==='null')
    if(token==='null'){
        return res.status(401).send('Peticion no autorizada');
    }
    //si llega a este punto es por que ya envio la cabezara de autorizacion y tampoco esta vacia, por tanto esta enviando un token, por tanto extraere un payload, para esto debo verificar el token y para esto necesito una llave privada tal como de definio mas arriba , en este caso 'secretkey', con esto obtendre nuevemante los datos que estan dentro del token..los cuales cuadare en la
    const payload =jwt.verify(token,'secretkey');
    console.log(payload);
    //De esta manera ya he obtenido el dato guardado dentro del token, luego entonces debo guardarlo para que el resto de funciones puwdan utilizar estos datos, como todas las funciones tienen un parametro llamado request(req), voy a pasrlo a través de ese objeto. En req creare una porpiedad llamada userId y como valor tendra el payload._id, ya que el payload es el arreglo entero y solo quiero el id, guardando asi el id del usuario en el req.userId
    req.userId=payload._id; 
    //una vez que lo tenga continua 
    next(); 
    //CON   ESTO TENGO LA VALIDACION  


  
   
}
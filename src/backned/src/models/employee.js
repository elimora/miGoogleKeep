const{Schema,model}=require('mongoose');


const EmployeeSchema= new Schema({
    name:String,
    task:String,
    date:String
},
{
    timestamps:true 
}

);

//para guardar los datos de los usuarios  en la base. Debo proporcionar el nombre de como sera guadado el la base de datos elegido por mi (Employee) y el esquema de datos que utilizara sera , 
module.exports=model('employee', EmployeeSchema);
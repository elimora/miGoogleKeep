const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/angular-auth', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(db =>console.log('La base de datos esta conectada'))
    .catch(err=>console.log(err)); 


    module.exports=mongoose
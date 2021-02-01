const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@sreeshafiles.sqau8.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema=mongoose.Schema

const AuthorSchema= new Schema({

    name:String,    
    genre:String,
    img:String

})
var Authordata=mongoose.model('authordata',AuthorSchema);
module.exports=Authordata;
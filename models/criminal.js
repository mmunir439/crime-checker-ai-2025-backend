const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
   name:{type:String,required:true},
   age:{type:Number,required:true},
   crimeType:{type:String,required:true},
   cnic:{type:String,required:true,unique:true},
   photo:{type:String,required:true},
})
module.exports = mongoose.model('Criminal', Schema);
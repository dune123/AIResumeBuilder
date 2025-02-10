const mongoose=require('mongoose');

const UserSkills=new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    rating:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('UserSkills',UserSkills);
const mongoose=require('mongoose');

const UserExperience=new mongoose.Schema({
    title:{
        type:String
    },
    companyName:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    currentlyWorking:{
        type:Boolean
    },
    workSummery:{
        type:String
    }
})

module.exports=mongoose.model('UserExperience',UserExperience);
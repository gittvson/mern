const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model("users",userSchema);
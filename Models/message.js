const mongoose=require('mongoose')
let messageschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,

    },
    firstname:{
        type:String,
        required:true,
        minLength:[3,"First name must contain atleast 3 characters"]
    },
    lastname:{
        type:String,
        required:true,
        minLength:[3,"First name must contain atleast 3 characters"]
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
        minLength:[11,"Message should conatain atleast 11 characters"],
    },
})

const MESSAGE=mongoose.model('MESSAGE',messageschema)
module.exports=MESSAGE;
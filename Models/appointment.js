const mongoose=require('mongoose')
let appointmentschema=new mongoose.Schema({
    firstname:String,
    disease:String,
    gender:String,
    age:String,
    address:String,
    phone:Number,

})

const APPOINTMENT=mongoose.model('APPOINTMENT',appointmentschema)
module.exports=APPOINTMENT;
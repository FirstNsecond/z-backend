require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser=require("body-parser")
const axios=require('axios')
const cors = require('cors')

const MESSAGE = require('./Models/message.js')
const APPOINTMENT = require('./Models/appointment.js')

const SERVICE = require('./Models/service.js')

require('dotenv').config();

const app = express()

  const frontend=process.env.FRONTEND1 || "http://localhost:7000"
  const admin=process.env.FRONTEND2 || "http://localhost:10000"
  const self=process.env.SELF_URI || "http://localhost:3000"

const PORT = process.env.PORT || 3000 ;
app.use(cors({
    origin: [frontend,admin,self],
    credentials: true,
}))

const mongo_uri=process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_management'
mongoose.connect(mongo_uri);

app.use(bodyParser.json())


app.post('/message', async (req, res) => {
    try {

        let x = await MESSAGE.create(req.body)

        res.json({
            status: true,
            message: 'Message sent successfully'
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.errors[Object.keys(error.errors)[0]].message
        })
    }
})

app.post('/appointment', async (req, res) => {
    try {
        let data = req.body
       
        const appointment = await APPOINTMENT.create(data)

        res.json({
            status: true,
            message: "Appointment received"
        })

    } catch (error) {
        res.json({
            status: false,
            message: "Something went wrong"
        })
    }
})
app.get('/getservice', async (req, res) => {
    try {
        const service = await SERVICE.find({})
        res.json({
            status: true,
            service: service,
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Something went wrong"
        })
    }
})


app.get('/getappointments', async (req, res) => {
    try {

        let appointments = await APPOINTMENT.find({})

        res.json(appointments.reverse())

    } catch (error) {
        res.json(["Something went wrong"])
    }
})
app.get('/getmessages', async (req, res) => {
    try {

        let messages = await MESSAGE.find({})
        res.json(messages.reverse())
    } catch (error) {
        res.json(["Something went wrong"])
    }
})
app.post('/addservice', async (req, res) => {
    try {
        let service = await SERVICE.create(req.body)

        res.json({
            status: true,
            message: "Added successfully",
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Added successfully",
        })
    }
})
app.get('/getadminservice', async (req, res) => {
    try {
        let service = await SERVICE.find({})
        res.json(service)
    } catch (error) {
        res.json(["Something went wrong"])
    }
})
app.put('/removeservice', async (req, res) => {
    try {
        let { id } = req.body;
        await SERVICE.findByIdAndDelete(id)
        res.json({
            status: true,
            message: "Removed successfully",
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Something went wrong",
        })
    }
})

app.put('/removeappointment', async (req, res) => {
    try {
        let { id } = req.body;
        await APPOINTMENT.findByIdAndDelete(id)
        res.json({
            status: true,
            message: "Appointment removed successfully",
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Something went wrong",
        })
    }
})
app.put('/removemessage', async (req, res) => {
    try {
        let { id } = req.body;
        await MESSAGE.findByIdAndDelete(id)
        res.json({
            status: true,
            message: "Message removed successfully",
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Something went wrong",
        })
    }
})

const selfcall=async()=>{
let res=await axios.get(`${process.env.SELF_URI}/getservice`,{
    withCredentials:true
})
return null;
}

setInterval(() => {
    selfcall()
}, 5*60*1000);

app.listen((PORT), () => {
    console.log(`Client app listening at port ${PORT}`)
})


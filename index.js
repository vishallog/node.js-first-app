import express from "express";
import path from 'path'
import mongoose from "mongoose";
import { error } from "console";
const app = express()

//database connection
mongoose.connect('mongodb://localhost:27017/Student').then(()=>{
    console.log("Database connected succesfully")
},(error)=>{ console.log(error)})

//creating schema for collection 
const studentsSchema = new mongoose.Schema({
    name:String,
    email:String
})

const Student = mongoose.model('Student',studentsSchema)

const xpath = path.join(path.resolve(),'a.html')
console.log(path.resolve())

const students = []
//we need to set an engine when we have to work with or send dynamic file
app.set("view engine","ejs")

//Middleware when we have to send the static file there we have to use 'USE'
app.use(express.static(path.join(path.resolve(),'public')))
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.sendFile("index")
})

app.post('/contact',async (req,res)=>{
    const {name,email} = req.body;
    await Student.create({name,email})
    console.log(name,"    ",email)

    res.send({message:"Data is added succesfully"})
})

app.get('/students',(req,res)=>{
    
})

app.listen(3001,()=>{
    console.log("App is listening")
})
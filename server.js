var express = require('express');
var mongoose = require('mongoose');
const dotenv = require("dotenv").config({ path: "./config/.env"});
const User = require('./models/User');
const app = express();

//starting the server
var server = app.listen( 3001, () => {

    console.log('Server is started on localhost:'+ (3001))
  })

//database connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=> err ? console.error(err): console.log("connected to the database"))

//start the CRUD
app.use(express.json());

//get all users 
app.get('/user',(req,res)=>{
    User.find().then((user)=>res.send(user)).catch((err)=>res.send(err))
})

//ADD A NEW USER TO THE DATABASE 

app.post('/user',(req,res)=>{
      
    const{firstName,lastName,email,age}=req.body;
    const newUser=new User({firstName,lastName,email,age});
    newUser.save()
           .then((User)=>res.send(User)).then(()=>console.log('user added succesefully'))
           .catch((err)=>res.status(400).send({msg:"ERROR ADD"}))
})

// Edit a user by id
app.put('/user/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    User.findByIdAndUpdate(id,{...req.body},{new:true}).then((user)=>res.send(user))
    .catch((err)=>res.send(err))
})


//delete a user 

app.delete('/user/:id',(req,res)=>{
    const id = req.params.id
    User.findByIdAndDelete(id).then((user)=>res.send(user)).catch((err)=>res.send(err))
})
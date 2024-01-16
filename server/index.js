require('dotenv').config()
const express=require('express')
var app = express()
var cors = require('cors')
const mongoose = require('mongoose')
const connection=require('./db')

const userRoutes=require('./routes/user')
const authRoutes=require('./routes/auth')

// middleware
app.use(express.json())
app.use(cors())

//for DATABASE connections
// connection()
mongoose.connect('mongodb://localhost:27017/project 1');

//routes
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

const port=process.env.PORT || 5000
// app.get('/',(req,res)=>{
//     res.send("<h1>bichichoda khankichodas na</h1>")
// })
app.listen(port,()=>{
    console.log(`app is listening on http://localhost${port}`)
})


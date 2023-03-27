const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
const frontendRouter= require('./router/frontend')
const adminRouter=require('./router/admin')
const mongoose =require('mongoose')
const multer = require('multer')
const nodemailer = require('nodemailer')

mongoose.connect('mongodb://127.0.0.1:27017/ArSannu',()=>{
    console.log('DataBase is conntede to ArSannu')
})

app.use('/admin',adminRouter)
app.use(frontendRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(5000)
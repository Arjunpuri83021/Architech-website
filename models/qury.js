const mongoose =require('mongoose')

const qurySchema=mongoose.Schema({
    name:String,
    email:String,
    sub:String,
    body:String,
    status:String
})




module.exports= mongoose.model('qury',qurySchema)
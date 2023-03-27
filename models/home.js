const mongoose=require('mongoose')

const homeSchema=mongoose.Schema({
    logo:String,
    first:String,
    second:String,
    third:String
})

module.exports=mongoose.model('home',homeSchema)
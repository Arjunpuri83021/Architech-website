const mongoose=require('mongoose')

const archiSchme=mongoose.Schema({
    img:String,
    comapny:String,
    place:String,
    status:''
    
})

module.exports=mongoose.model('architwon',archiSchme)
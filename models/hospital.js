const mongoose=require('mongoose')

const archiSchme=mongoose.Schema({
    img:String,
    company:String,
    place:String,
    status:''
    
})

module.exports=mongoose.model('archihospital',archiSchme)
const router=require('express').Router()
const Home=require('../models/home')
const Town = require('../models/archiTwon')
const Housing =require('../models/archiHouse')
const Office = require('../models/office')
const Retail = require('../models/retail')
const Private = require('../models/private')
const Education =require('../models/education')
const Culture = require('../models/culture')
const Hospital = require('../models/hospital')
const Interior = require('../models/interior')
const Inteoffice = require('../models/inteoffice')
const Intretail = require('../models/intretail')
const Installation = require('../models/installation')
const Qury = require('../models/qury')
const nodemailer = require('nodemailer')




router.get('/',async(req,res)=>{
    const record =await Home.findOne()
    res.render('index.ejs',{record})
})



router.get('/about',async(req,res)=>{
    const record=await Home.findOne()
    res.render('aboutus.ejs',{record})
})

router.get('/architecture',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Town.find({status:'publish'})
    res.render('archi.ejs',{record,archirecord})
})




router.get('/housing',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Housing.find({status:'publish'})
    res.render('housing.ejs',{record,archirecord})
})

router.get('/office',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Office.find({status:'publish'})
    res.render('office.ejs',{record,archirecord})
    

})


router.get('/retail',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Retail.find({status:'publish'})
    res.render('retail.ejs',{record,archirecord})
    

})


router.get('/private',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Private.find({status:'publish'})
    res.render('privatehouse.ejs',{record,archirecord})
})

router.get('/education',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Education.find({status:'publish'})
    res.render('education.ejs',{record,archirecord})
})

router.get('/culture',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Culture.find({status:'publish'})
    res.render('culture.ejs',{record,archirecord})
})

router.get('/hospitel',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Hospital.find({status:'publish'})
    res.render('hospitel.ejs',{record,archirecord})
})

router.get('/interior',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Interior.find({status:'publish'})
    res.render('interior.ejs',{record,archirecord})
})

router.get('/intoffi',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Inteoffice.find({status:'publish'})
    res.render('intoffi.ejs',{record,archirecord})
})


router.get('/intretail',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Intretail.find({status:'publish'})
    res.render('intretail.ejs',{record,archirecord})
})


router.get('/installation',async(req,res)=>{
    const record = await Home.findOne()
    const archirecord=await Installation.find({status:'publish'})
    res.render('installation.ejs',{record,archirecord})
})




router.get('/contact',async(req,res)=>{
    const record = await Home.findOne()
    res.render('contact.ejs',{record})
})

router.post('/contactrecord',async(req,res)=>{
 const {name,email,sub,body}=req.body
 const record= new Qury({name:name,email:email,sub:sub,body:body,status:'Unread'})
 await record.save()
 console.log(record)
 res.redirect('/')
})


module.exports = router
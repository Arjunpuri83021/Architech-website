const router=require('express').Router()
const Home=require('../models/home')
const multer = require('multer')
const nodemailer = require('nodemailer')

const Town=require('../models/archiTwon')
const Housing =require('../models/archiHouse')
const Office = require('../models/office')
const Retail = require('../models/retail')
const Private = require('../models/private')
const Education = require('../models/education')
const Culture = require('../models/culture')
const Hospital = require('../models/hospital')
const OffiInter = require('../models/inteoffice')

const Interior = require('../models/interior')
const Inteoffice = require('../models/inteoffice')
const Intretail=require('../models/intretail')
const Installation = require('../models/installation')
const Quary = require('../models/qury')


let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload') 
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{files:1024*1024*6}
})

//const multupload=upload.fields([{name: 'first'},{name:'second'},{name:'third'}])


router.get('/',async(req,res)=>{
    const record =await Home.findOne()
    res.render('admin/dashbord.ejs',{record})
})

router.get('/hometest',async(req,res)=>{
   const record=  new Home({
        logo:'puri',
    first:'img1',
    second:'img2',
    third:'img3'
    })
    await record.save()
    console.log(record)
})

router.get('/homeupdate/:id',async(req,res)=>{
    const id =req.params.id
    const record=await Home.findById(id)
    res.render('admin/homeupdate.ejs',{record})
})

router.post('/homeupdaterecord/:id',upload.fields([{name:'logo'},{name:'first'},{name:'second'},{name:'third'}]),async(req,res)=>{
//  console.log(req.files.logo[0].filename)
// //  console.log(req.files.first[0].filename)
// //  console.log(req.files.second[0].filename)
    const id = req.params.id
    if(req.files)
    {
        for(key in (req.files))
        {
            const uploadimg=(req.files)[key][0]
            const fieldname=uploadimg.fieldname
            console.log(fieldname,(uploadimg.filename,req.files))
            if(fieldname=='logo')
            {
                await Home.findByIdAndUpdate(id,{logo:(uploadimg.filename)})

            }
            else if(fieldname=='first')
            {
                await Home.findByIdAndUpdate(id,{first:(uploadimg.filename)})

            }
            else if(fieldname=='second')
            {
                await Home.findByIdAndUpdate(id,{second:(uploadimg.filename)})

            }
            else if(fieldname=='third')
            {
                await Home.findByIdAndUpdate(id,{third:(uploadimg.filename)})
            }
        }  
    }
       res.redirect('/admin/')
     })
 

     router.get('/about',(req,res)=>{
        res.render('admin/about.ejs')
     })


     router.get('/archi',async(req,res)=>{
        const record= await Town.find()
        const totalservices= await Town.count()
        const totalpublish= await Town.count({status:'publish'})
        const totalunpublish= await Town.count({status:'unpublish'})
       res.render('admin/archi.ejs',{record,totalservices,totalpublish,totalunpublish})
     })

     router.get('/addservices',(req,res)=>{
        
        res.render('admin/addservices.ejs')
     })
     

     router.post('/addservicerecord',upload.single('img'),async(req,res)=>{
        const img =req.file.filename
        const {comapny,place}=req.body
       const record= await new Town({ img:img,comapny:comapny,place:place,status:"unpublish"})
       await record.save()
       console.log(record)
       res.redirect('/admin/archi')
     })

     router.get('/servicestatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Town.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Town.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/archi')
    })

    
    router.post('/servicsearch',async(req,res)=>{
    const {search}=req.body
    const record= await Town.find({status:search})
    //console.log(record)
    const totalservices = await Town.count()
    const totalpublish =await Town.count({status:'publish'})
   const totalunpublish= await Town.count({status:'unpublish'})
    res.render('admin/archi.ejs',{record,totalservices,totalpublish,totalunpublish})
})

     router.get('/deleteservice/:id',async(req,res)=>{
        const id =req.params.id
        await Town.findByIdAndDelete(id)
        res.redirect("/admin/archi")
     })

     router.get('/housing',async(req,res)=>{
        const record=await Housing.find()
        const totalservices = await Housing.count()
        const totalpublish = await Housing.count({status:'publish'})
        const totalunpublish = await Housing.count({status:'unpublish'})
       res.render('admin/housing.ejs',{record,totalservices,totalpublish,totalunpublish}) 
     })
 
    router.get('/housingadd',(req,res)=>{
        res.render('admin/housingaddserices.ejs')
    })

    router.post('/housingaddrecord',upload.single('img'),async(req,res)=>{
       const imgname= req.file.filename
        const {comapny,place}=req.body
      const record=  await new Housing({img:imgname,comapny:comapny,place:place,status:''})
      await record.save()
      console.log(record)
      res.redirect('/admin/housing')
    })

    router.get('/deletehosing/:id',async(req,res)=>{
       const id = req.params.id
       await Housing.findByIdAndDelete(id)
       res.redirect('/admin/housing')

    })
    
    router.get('/housingstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Housing.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Housing.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/housing')
    })


    router.post('/housingsearch',async(req,res)=>{
        const {search}=req.body
        const record= await Housing.find({status:search})
        //console.log(record)
        const totalservices = await Housing.count()
        const totalpublish =await Housing.count({status:'publish'})
       const totalunpublish= await Housing.count({status:'unpublish'})
        res.render('admin/housing.ejs',{record,totalservices,totalpublish,totalunpublish})
    })







    router.get('/office',async(req,res)=>{
        const record=await Office.find()
        const totalservices = await Office.count()
        const totalpublish = await Office.count({status:'publish'})
        const totalunpublish = await Office.count({status:'unpublish'})
       res.render('admin/office.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/officeadd',(req,res)=>{
        res.render('admin/officeadd.ejs')
    })

    router.post('/officeaddrecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Office({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       console.log(record)
       res.redirect('/admin/office')
    })

    router.get('/officestatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Office.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Office.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/office')
    })

    router.post('/officeserach',async(req,res)=>{
        const {search}=req.body
        const record= await Office.find({status:search})
        //console.log(record)
        const totalservices = await Office.count()
        const totalpublish =await Office.count({status:'publish'})
       const totalunpublish= await Office.count({status:'unpublish'})
        res.render('admin/office.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteoffice/:id',async(req,res)=>{
        const id = req.params.id
        await Office.findByIdAndDelete(id)
        res.redirect('/admin/office')
     })
     





     
    router.get('/retail',async(req,res)=>{
        const record=await Retail.find()
        const totalservices = await Retail.count()
        const totalpublish = await Retail.count({status:'publish'})
        const totalunpublish = await Retail.count({status:'unpublish'})
       res.render('admin/retail.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/retailadd',(req,res)=>{
        res.render('admin/retailadd.ejs')
    })

    router.post('/retailaddrecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Retail({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       console.log(record)
       res.redirect('/admin/retail')
    })

    router.get('/retailstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Retail.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Retail.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/retail')
    })


    router.post('/retailsearch',async(req,res)=>{
        const {search}=req.body
        const record= await Retail.find({status:search})
        //console.log(record)
        const totalservices = await Retail.count()
        const totalpublish =await Retail.count({status:'publish'})
       const totalunpublish= await Retail.count({status:'unpublish'})
        res.render('admin/retail.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteretail/:id',async(req,res)=>{
        const id = req.params.id
        await Retail.findByIdAndDelete(id)
        res.redirect('/admin/retail')
     })






     router.get('/private',async(req,res)=>{
        const record=await Private.find()
        const totalservices = await Private.count()
        const totalpublish = await Private.count({status:'publish'})
        const totalunpublish = await Private.count({status:'unpublish'})
       res.render('admin/privatehouse.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/privateadd',(req,res)=>{
        res.render('admin/privateadd.ejs')
    })

    router.post('/privatehousingrecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Private({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       console.log(record)
       res.redirect('/admin/private')
    })

    router.get('/privatehousingstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Private.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Private.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/private')
    })


    router.post('/privatesearch',async(req,res)=>{
        const {search}=req.body
        const record= await Private.find({status:search})
        //console.log(record)
        const totalservices = await Private.count()
        const totalpublish =await Private.count({status:'publish'})
       const totalunpublish= await Private.count({status:'unpublish'})
        res.render('admin/privatehouse.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteprivate/:id',async(req,res)=>{
        const id = req.params.id
        await Private.findByIdAndDelete(id)
        res.redirect('/admin/private')
     })
     




     
     router.get('/education',async(req,res)=>{
        const record=await Education.find()
        const totalservices = await Education.count()
        const totalpublish = await Education.count({status:'publish'})
        const totalunpublish = await Education.count({status:'unpublish'})
       res.render('admin/education.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/educationadd',(req,res)=>{
        res.render('admin/educationadd.ejs')
    })

    router.post('/Educationrecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Education({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       console.log(record)
       res.redirect('/admin/education')
    })

    router.get('/educationstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Education.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Education.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/education')
    })


    router.post('/educationsearch',async(req,res)=>{
        const {search}=req.body
        const record= await Education.find({status:search})
        //console.log(record)
        const totalservices = await Education.count()
        const totalpublish =await Education.count({status:'publish'})
       const totalunpublish= await Education.count({status:'unpublish'})
        res.render('admin/education.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteeducation/:id',async(req,res)=>{
        const id = req.params.id
        await Education.findByIdAndDelete(id)
        res.redirect('/admin/education')
     })





     
     router.get('/culture',async(req,res)=>{
        const record=await Culture.find()
        const totalservices = await Culture.count()
        const totalpublish = await Culture.count({status:'publish'})
        const totalunpublish = await Culture.count({status:'unpublish'})
       res.render('admin/culture.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/cultureadd',(req,res)=>{
        res.render('admin/cultureadd.ejs')
    })

    router.post('/culturerecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Culture({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       console.log(record)
       res.redirect('/admin/culture')
    })

    router.get('/culturestatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Culture.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Culture.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/culture')
    })


    router.post('/culturesearch',async(req,res)=>{
        const {search}=req.body
        const record= await Culture.find({status:search})
        //console.log(record)
        const totalservices = await Culture.count()
        const totalpublish =await Culture.count({status:'publish'})
       const totalunpublish= await Culture.count({status:'unpublish'})
        res.render('admin/culture.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteculture/:id',async(req,res)=>{
        const id = req.params.id
        await Culture.findByIdAndDelete(id)
        res.redirect('/admin/culture')
     })
     




     
     router.get('/hospital',async(req,res)=>{
        const record=await Hospital.find()
        const totalservices = await Hospital.count()
        const totalpublish = await Hospital.count({status:'publish'})
        const totalunpublish = await Hospital.count({status:'unpublish'})
       res.render('admin/hospitel.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/hospitaladd',(req,res)=>{
        res.render('admin/hospitaladd.ejs')
    })

    router.post('/hospitalrecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Hospital({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       console.log(record)
       res.redirect('/admin/hospital')
    })

    router.get('/hospitalstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Hospital.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Hospital.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/hospital')
    })


    router.post('/hospitalsearch',async(req,res)=>{
        const {search}=req.body
        const record= await Hospital.find({status:search})
        //console.log(record)
        const totalservices = await Hospital.count()
        const totalpublish =await Hospital.count({status:'publish'})
       const totalunpublish= await Hospital.count({status:'unpublish'})
        res.render('admin/hospitel.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deletehospital/:id',async(req,res)=>{
        const id = req.params.id
        await Hospital.findByIdAndDelete(id)
        res.redirect('/admin/hospital')
     })





     

     
     router.get('/interior',async(req,res)=>{
        const record=await Interior.find()
        const totalservices = await Interior.count()
        const totalpublish = await Interior.count({status:'publish'})
        const totalunpublish = await Interior.count({status:'unpublish'})
       res.render('admin/interior.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/interioradd',(req,res)=>{
        res.render('admin/interioradd.ejs')
    })

    router.post('/interioraddrecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Interior({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       console.log(record)
       res.redirect('/admin/interior')
    })

    router.get('/interiorstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Interior.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Interior.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/interior')
    })


    router.post('/interiorsearch',async(req,res)=>{
        const {search}=req.body
        const record= await Interior.find({status:search})
        //console.log(record)
        const totalservices = await Interior.count()
        const totalpublish =await Interior.count({status:'publish'})
       const totalunpublish= await Interior.count({status:'unpublish'})
        res.render('admin/interior.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteinterior/:id',async(req,res)=>{
        const id = req.params.id
        await Interior.findByIdAndDelete(id)
        res.redirect('/admin/interior')
     })




     
     router.get('/intoffi',async(req,res)=>{
        const record=await Inteoffice.find()
        const totalservices = await Inteoffice.count()
        const totalpublish = await Inteoffice.count({status:'publish'})
        const totalunpublish = await Inteoffice.count({status:'unpublish'})
       res.render('admin/intoffi.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/inteofficeadd',(req,res)=>{
        res.render('admin/inteofficeadd.ejs')
    })

    router.post('/inteoffirecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Inteoffice({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       //console.log(record)
       res.redirect('/admin/intoffi')
    })

    router.get('/offiinteriorstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Inteoffice.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Inteoffice.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/intoffi')
    })


    router.post('/interiorsearch',async(req,res)=>{
        const {search}=req.body
        const record= await Inteoffice.find({status:search})
        //console.log(record)
        const totalservices = await Inteoffice.count()
        const totalpublish =await Inteoffice.count({status:'publish'})
       const totalunpublish= await Inteoffice.count({status:'unpublish'})
        res.render('admin/intoffi.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteinterioroffice/:id',async(req,res)=>{
        const id = req.params.id
        await Inteoffice.findByIdAndDelete(id)
        res.redirect('/admin/intoffi')
     })




     
     router.get('/intreatil',async(req,res)=>{
        const record=await Intretail.find()
        const totalservices = await Intretail.count()
        const totalpublish = await Intretail.count({status:'publish'})
        const totalunpublish = await Intretail.count({status:'unpublish'})
       res.render('admin/intreatil.ejs',{record,totalservices,totalpublish,totalunpublish}) 
    })

    router.get('/intretailadd',(req,res)=>{
        res.render('admin/intretailadd.ejs')
    })

    router.post('/intretailrecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Intretail({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       //console.log(record)
       res.redirect('/admin/intreatil')
    })

    router.get('/retailintstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Intretail.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Intretail.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/intreatil')
    })


    router.post('/interretailsearch',async(req,res)=>{
        const {search}=req.body
        const record= await Intretail.find({status:search})
        //console.log(record)
        const totalservices = await Intretail.count()
        const totalpublish =await Intretail.count({status:'publish'})
       const totalunpublish= await Intretail.count({status:'unpublish'})
        res.render('admin/intreatil.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteintretail/:id',async(req,res)=>{
        const id = req.params.id
        await Intretail.findByIdAndDelete(id)
        res.redirect('/admin/intreatil')
     })






     router.get('/installation',async(req,res)=>{
        const record=await Installation.find()
        const totalservices = await Installation.count()
        const totalpublish = await Installation.count({status:'publish'})
        const totalunpublish = await Installation.count({status:'unpublish'})
       res.render('admin/installation.ejs',{record,totalservices,totalpublish,totalunpublish}) 
       
    })

    router.get('/installationadd',(req,res)=>{
        res.render('admin/installationadd.ejs')
    })

    router.post('/installationrecord',upload.single('img'),async(req,res)=>{
       const imgname = req.file.filename
       const {company,place}=req.body
       const record=new Installation({img:imgname,company:company,place:place,status:'unpublish'})
       await record.save()
       //console.log(record)
       res.redirect('/admin/installation')
    })

    router.get('/installationstatus/:id',async(req,res)=>{
        const id =req.params.id
        const record= await Installation.findById(id)
        //console.log(record)
        let newstatus = null
        if(record.status=='unpublish'){
            newstatus='publish'
    
        }
        else{
            newstatus='unpublish'
        }
    
        await Installation.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/installation')
    })


    router.post('/installationsearch',async(req,res)=>{
        const {search}=req.body
        const record= await Installation.find({status:search})
        //console.log(record)
        const totalservices = await Installation.count()
        const totalpublish =await Installation.count({status:'publish'})
       const totalunpublish= await Installation.count({status:'unpublish'})
        res.render('admin/installation.ejs',{record,totalservices,totalpublish,totalunpublish})
    })

    router.get('/deleteinstallation/:id',async(req,res)=>{
        const id = req.params.id
        await Installation.findByIdAndDelete(id)
        res.redirect('/admin/installation')
     })





     router.get('/qury',async(req,res)=>{
        const record= await Quary.find() 
        const totalQuery = await Quary.count()
        const totalRead = await Quary.count({status:'Read'})
        const totalUnread = await Quary.count({status:'Unread'})
        res.render('admin/quary.ejs',{record,totalQuery,totalRead,totalUnread})
        //console.log(record)
     })

    //  router.post('/quarysearch',async(req,res)=>{
    //     const {search}=req.body
    //     const record = await Quary({status:search})
    //     const totalQuery = await Quary.count()
    //     const totalRead = await Quary.count({status:'Read'})
    //     const totalUnread = await Quary.count({status:'Unread'})
    //     res.render('admin/quary.ejs',{record,totalQuery,totalRead,totalUnread})
    //  })

    router.post('/quarysearch',async(req,res)=>{
        const {search}=req.body
        const record= await Quary.find({status:search})
        //console.log(record)
        const totalQuery = await Quary.count()
        const totalRead =await Quary.count({status:'Read'})
       const totalUnread= await Quary.count({status:'Unread'})
        res.render('admin/quary.ejs',{record,totalQuery,totalRead,totalUnread})
    })

     router.get('/deletquary/:id',async(req,res)=>{
        const id = req.params.id
        await Quary.findByIdAndDelete(id)
        res.redirect('/admin/qury')
     })

     router.get('/quaryreply/:id',async(req,res)=>{
        const id = req.params.id
        const record =await Quary.findById(id)

        res.render('admin/quaryreplay.ejs',{record})
     })

     router.post('/quaryreplyadmin/:id',upload.single('img'),async(req,res)=>{
      const id = req.params.id
      const {email,sub,body}=req.body

      let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'thevirus991@gmail.com', // generated ethereal user
      pass: "ibhiehyudevbrxpl", // generated ethereal password
    },
  });

  // send mail with defined transport object
  if(req.file){
    const path = req.file.path
  let info = await transporter.sendMail({
    from: 'thevirus991@gmail.com', // sender address
    to: email, // list of receivers
    subject: sub, // Subject line
    text: body, // plain text body
   attachments:[{
    path:path
   }]
  });
}
else{
    let info = await transporter.sendMail({
        from: 'thevirus991@gmail.com', // sender address
        to: email, // list of receivers
        subject: sub, // Subject line
        text: body, // plain text body
      });

}
await Quary.findByIdAndUpdate(id,{status:'Read'})
  res.redirect('/admin/qury')
     })
module.exports = router
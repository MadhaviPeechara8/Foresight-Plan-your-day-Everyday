//import cloudinary modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name:'dkuycoir3',
    api_key:'813488322345129',
    api_secret:'WkmhF_dOg58w30tasO937qaZRFs'
})

//configure multjer-storage-cloudinary
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async (req,file)=>{
        return {
            folder:"ecommerceapp",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})

//configure multer
const multerObj = multer({ storage: clStorage })

module.exports=multerObj;
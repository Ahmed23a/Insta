const multer = require("multer")
const path = require("path")
const {nanoid} = require("nanoid")
const  fs = require("fs")




const validationMethod =
{
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    textFile: ['application/pdf'],
}
   


function myMulter(customPath , validationType)
{
    const fullPath = path.join(__dirname, `../uploads/${customPath}`)
    if(!fs.existsSync(fullPath))
    {
        fs.mkdirSync(fullPath,{recursive:true})
    }

    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            req.destinationFile =`uploads/${customPath}`
            cb(null,fullPath)
        },
        filename: function(req,file,cb)
        {
            const fullFileName = nanoid()+"&&" + file.originalname
            cb(null,fullFileName)
        },
        
    
       
    })


   

    const fileValidator = function (req, file, cb) {
        if (validationType.includes(file.mimetype)) {
            cb(null, true)
        } else {
            req.fileFormat = true
            cb(null, false)
        }
    }
    const upload = multer({ det: fullPath, fileValidator, storage })
    return upload
}


module.exports = {myMulter, validationMethod}
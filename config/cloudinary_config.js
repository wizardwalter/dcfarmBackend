const cloudinary = require('cloudinary').v2; 
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 
const multer = require('multer'); 

cloudinary.config({
    cloud_name: "walterscloudinary", 
    api_key: "173518653441374", 
    api_secret: "iJersa7sOIEP3lXrbEQso2xtKEQ"
}); 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary, 
    params: async (req, file) => {
        console.log("WE HITTTTT", req.body)
        return {
            folder: 'k9cs',
            public_id: file.fieldname + '-' + Date.now()
        }
    }

})

var upload = multer({storage: storage}); 

module.exports = upload;
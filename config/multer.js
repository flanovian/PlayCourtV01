const multer = require('multer');
const path = require('path');
const ErrorHandler = require('../utils/ErrorHandler');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix) ; //format nama file
    }
  });

const upload = multer({ 
    storage: storage,
    // fungsi untuk memeriksa format file yg diizinkan
    fileFilter : function (req,file, cb){
        // console.log(req.body)
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        }else{
            cb(new ErrorHandler('only images are allowed', 405))
        }
    }
})
  
module.exports = upload
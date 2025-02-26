const express = require('express');
const wrapAsync = require('../utils/warpAsync') //biar error keliatan
const handleMulterError =  require('../middlewares/isValidVideo')

// schema
const IsValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const {isAuthorMyLevel} = require('../middlewares/isAuthor');
const {validateLevel} = require('../middlewares/validatator');
const upload = require('../config/multervideo');


// Controller
const levelController = require('../controller/levelController');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/create', isAuth,(req, res) => {
    res.render('mylevel/create')
})


router.route('/')
    .get(isAuth, wrapAsync(levelController.index))
    .post(isAuth, upload.single('matchVideo'),handleMulterError, validateLevel, wrapAsync(levelController.store));
    // .post(upload.single('matchVideo'),(req, res)=>{
    //     console.log(req.body)
    //     console.log(req.file)
    //     res.send('gagal')
    // })
    
    // .post(/*isAuth,*/ upload.array('image', 5), validateLevel, wrapAsync(levelController.store))
    // .post(isAuth, upload.array('image', 5), (req, res)=>{
    //     console.log(req.files)
    //     console.log(req.body)
    //     res.send('OK')
    // })
    



// router.route('/:id')
//     .get(isAuth, IsValidObjectId('/mylevel'), wrapAsync(levelController.show))
//     .put(isAuth, isAuthorMyLevel, IsValidObjectId('/mylevel'), upload.array('image', 5), validateLevel, wrapAsync(levelController.update))
//     .delete(isAuth, isAuthorMyLevel, IsValidObjectId('/mylevel'), IsValidObjectId('/mylevel'),  wrapAsync(levelController.destroy))
    



// // router.get('/:id/edit', isAuth, isAuthorMyLevel, IsValidObjectId('/mylevel'),wrapAsync(levelController.edit))
// router.get('/:id/edit', /*isAuth, isAuthorMyLevel,*/ IsValidObjectId('/mylevel'),wrapAsync(levelController.edit))

// router.delete('/:id/images',isAuth, isAuthorMyLevel, IsValidObjectId('/mylevel'), IsValidObjectId('/mylevel'),  wrapAsync(levelController.destroyImage))
    


module.exports = router;
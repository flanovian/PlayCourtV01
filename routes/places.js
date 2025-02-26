const express = require('express');
const wrapAsync = require('../utils/warpAsync') //biar error kelaiatan

// schema
const IsValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const {isAuthorPlace} = require('../middlewares/isAuthor');
const {validatePlace} = require('../middlewares/validatator');
const upload = require('../config/multer');

// Controller
const PlaceController = require('../controller/places')
const router = express.Router();


router.get('/create', isAuth, (req, res) => {
    res.render('places/create')
})


router.route('/')
    .get(wrapAsync(PlaceController.index))
    .post(isAuth, upload.array('image', 5), validatePlace, wrapAsync(PlaceController.store))
    // .post(isAuth, upload.array('image', 5), (req, res)=>{
    //     console.log(req.files)
    //     console.log(req.body)
    //     res.send('OK')
    // })



router.route('/:id')
    .get(IsValidObjectId('/places'), wrapAsync(PlaceController.show))
    .put(isAuth, isAuthorPlace, IsValidObjectId('/places'), upload.array('image', 5), validatePlace, wrapAsync(PlaceController.update))
    .delete(isAuth, isAuthorPlace, IsValidObjectId('/places'), IsValidObjectId('/places'),  wrapAsync(PlaceController.destroy))
    



router.get('/:id/edit', isAuth, isAuthorPlace, IsValidObjectId('/places'),wrapAsync(PlaceController.edit))

router.delete('/:id/images',isAuth, isAuthorPlace, IsValidObjectId('/places'), IsValidObjectId('/places'),  wrapAsync(PlaceController.destroyImage))
    


module.exports = router;
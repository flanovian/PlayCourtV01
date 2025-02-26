const express = require('express');
const wrapAsync = require('../utils/warpAsync') //biar error kelaiatan

// schema
const IsValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const {isAuthorTournament} = require('../middlewares/isAuthor');
const {validateTournament} = require('../middlewares/validatator');
const upload = require('../config/multer');


// Controller
const tournamentController = require('../controller/tournamentController')
const router = express.Router();


router.get('/create', isAuth,(req, res) => {
    res.render('tournaments/create')
})


router.route('/')
    .get(isAuth, wrapAsync(tournamentController.index))
    .post(isAuth, validateTournament, wrapAsync(tournamentController.store));
    // .post(/*isAuth,*/ upload.array('image', 5), validateTournament, wrapAsync(tournamentController.store))
    // .post(isAuth, upload.array('image', 5), (req, res)=>{
    //     console.log(req.files)
    //     console.log(req.body)
    //     res.send('OK')
    // })
    



router.route('/:id')
    .get(isAuth, IsValidObjectId('/tournaments'), wrapAsync(tournamentController.show))
    .put(isAuth, isAuthorTournament, IsValidObjectId('/tournaments'), upload.array('image', 5), validateTournament, wrapAsync(tournamentController.update))
    .delete(isAuth, isAuthorTournament, IsValidObjectId('/tournaments'), IsValidObjectId('/tournaments'),  wrapAsync(tournamentController.destroy))
    



// router.get('/:id/edit', isAuth, isAuthorTournament, IsValidObjectId('/tournaments'),wrapAsync(tournamentController.edit))
router.get('/:id/edit', /*isAuth, isAuthorTournament,*/ IsValidObjectId('/tournaments'),wrapAsync(tournamentController.edit))

router.delete('/:id/images',isAuth, isAuthorTournament, IsValidObjectId('/tournaments'), IsValidObjectId('/tournaments'),  wrapAsync(tournamentController.destroyImage))
    


module.exports = router;
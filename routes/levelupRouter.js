const express = require('express');
const wrapAsync = require('../utils/warpAsync') //biar error keliatan
// schema
const isAuth = require('../middlewares/isAuth');

// Controller
const levelupController = require('../controller/levelupController');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/')
    .get(isAuth, wrapAsync(levelupController.index))
   
router.route('/:userId')
    .get(isAuth, wrapAsync(levelupController.show))
  
module.exports = router;
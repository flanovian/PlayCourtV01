const express = require('express');
const wrapAsync = require('../utils/warpAsync') //biar error keliatan
// schema
const isAuth = require('../middlewares/isAuth');

// Controller
const playersController = require('../controller/playersController');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/')
    .get(isAuth, wrapAsync(playersController.index))
   
  
module.exports = router;
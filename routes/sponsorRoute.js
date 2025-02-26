const express = require('express');
const wrapAsync = require('../utils/warpAsync') //biar error keliatan
// schema
const isAuth = require('../middlewares/isAuth');

// Controller
const sponsorController = require('../controller/sponsorController');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/')
    .get(isAuth, wrapAsync(sponsorController.index))
   
  
module.exports = router;
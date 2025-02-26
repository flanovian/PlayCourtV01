const express = require('express');
const wrapAsync = require('../utils/warpAsync')

const IsValidObjectId = require('../middlewares/IsValidObjectId');
const isAuth = require('../middlewares/IsAuth');

const {validateReview} = require('../middlewares/validatator');

// schema
const {isAuthorReview} = require('../middlewares/isAuthor');
const ReviewController = require('../controller/reviews')
const router = express.Router({mergeParams:true});


// CREATE
router.post('/', isAuth, IsValidObjectId('/places'), validateReview, wrapAsync(ReviewController.store))

// DELETE
router.delete('/:review_id', isAuth, isAuthorReview, IsValidObjectId('/places'), wrapAsync(ReviewController.destroy))

module.exports = router;

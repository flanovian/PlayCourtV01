const Place = require('../models/place')
const Review = require('../models/review')
const myLevel = require('../models/levelModel')

///TRUE
const Tournament = require('../models/tournamentModel')


module.exports.isAuthorTournament = async(req, res, next) =>{
    // console.log(req.user)
    const {id} = req.params;
    let tournament = await Tournament.findById(id);

    if (!tournament.author.equals(req.user._id)) {
        req.flash('error_msg', 'Not authorize');
        return res.redirect('/tournaments');
    }
    next();

}

module.exports.isAuthorMyLevel = async(req, res, next) =>{
    // console.log(req.user)
    const {id} = req.params;
    let mylevel = await myLevel.findById(id);

    if (!mylevel.author.equals(req.user._id)) {
        req.flash('error_msg', 'Not authorize');
        return res.redirect('/mylevels');
    }
    next();

}

module.exports.isAuthorPlace = async(req, res, next) =>{
    // console.log(req.user)
    const {id} = req.params;
    let place = await Place.findById(id);

    if (!place.author.equals(req.user._id)) {
        req.flash('error_msg', 'Not authorize');
        return res.redirect('/places');
    }
    next();

}


module.exports.isAuthorReview = async(req, res, next) =>{
    // console.log(req.user)
    const {place_id, review_id} = req.params;
    let review = await Review.findById(review_id);

    if (!review.author.equals(req.user._id)) {
        req.flash('error_msg', 'Not authorized');
        return res.redirect(`/places/${place_id}`);
    }
    next();

}

const ErrorHandler = require('../utils/ErrorHandler')

const {levelSchema} = require('../schemas/levelSchema')
const {tournamentSchema} = require('../schemas/tournamentSchema')

module.exports.validateTournament = (req,res,next)=>{    
    const {error} = tournamentSchema.validate(req.body.tournament);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 404));
    }else{
        next();
    }
}

module.exports.validateLevel = (req, res, next) => {   
    if (!req.file) {
        return next(new ErrorHandler("Video pertandingan harus diunggah!", 400));
    }

    // Ubah path menjadi format objek yang sesuai dengan levelSchema
    req.body.matchVideo = `${req.protocol}://${req.get("host")}/videos/${req.file.filename}`;
    
    console.log("Updated req.body:", req.body);

    // Validasi dengan Joi
    const { error } = levelSchema.validate({ matchVideo: req.body.matchVideo });
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        return next(new ErrorHandler(msg, 400));
    }

    next();
};


module.exports.validatePlace = (req,res,next)=>{    
    const {error} = placeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 404));
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{    
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 404));
    }else{
        next();
    }
}
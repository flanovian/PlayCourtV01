const Tournament = require('../models/tournamentModel')
const fs = require('fs');
const ErrorHandler = require('../utils/ErrorHandler');

module.exports.index = async (req, res) => {
    const tournaments = await Tournament.find();
    res.render('tournaments/index', { tournaments })
}

module.exports.store = async (req, res, next) => { 
    // console.log(req.body)
    // const images = req.files.map(file => ({
    //     url: file.path,
    //     filename: file.filename
    // }))

    const tournament = new Tournament(req.body.tournament);

    await tournament.save();
    req.flash('success_msg', 'tournament added Successfully')
    res.redirect('/tournaments')
}

module.exports.show = async (req, res) => {

    const { id } = req.params;
    const tournament = await Tournament.findById(id)
    res.render('tournaments/show', { tournament })
}

module.exports.edit = async (req, res) => {
    // console.log(req.params.id)
    const tournament = await Tournament.findById(req.params.id);
    
    res.render('tournaments/edit', { tournament })
}
module.exports.update = async (req, res) => {
    const tournament = await Tournament.findByIdAndUpdate(req.params.id, { ...req.body.tournament });
    console.log(tournament)
    if(req.files && req.files.length > 0){
        tournament.images.forEach(image => {
            fs.unlink(image.url, err => new ErrorHandler(err))
        });

        const images = req.files.map(file => ({
            url: file.path,
            filename: file.filename
        }));
        tournament.images = images;
        await tournament.save();    
    }

    req.flash('success_msg', 'tournament Updated Successfully')
    res.redirect(`/tournaments/${req.params.id}`);
}

module.exports.destroy = async (req, res) => {
    const {id} = req.params
    const tournament = await Tournament.findById(id);

    if(tournament.images.length > 0){
        tournament.images.forEach(image => {
            fs.unlink(image.url, err => new ErrorHandler(err))
        });
    }

    await tournament.deleteOne();

    req.flash('success_msg', 'tournament Deleted Successfully')
    res.redirect('/tournaments')
}

module.exports.destroyImage = async(req, res)=>{
    try {
        const {id} = req.params;
        const {images}= req.body;

        if (!images || images.length ==0) {
            req.flash('error_msg', 'Please select at least one image');
            return res.redirect(`/tournaments/${id}/edit`)
        }

        images.forEach(image=>{
            fs.unlinkSync(image)
        });

        await tournament.findByIdAndUpdate(
            id,
            {$pull: {images:{url :{$in:images}}}}
        )
        req.flash('success_msg', 'Successfully deleted images');
        return res.redirect(`/tournaments/${id}/edit`);

    } catch (error) {
        const {id} = req.params;
        req.flash('error_msg', 'Failed to delete images');
        return res.redirect(`/tournaments/${id}/edit`);
    }
}
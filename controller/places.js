const Place = require('../models/place')
const fs = require('fs');
const ErrorHandler = require('../utils/ErrorHandler');

module.exports.index = async (req, res) => {
    const places = await Place.find();
    res.render('places/index', { places })
}

module.exports.store = async (req, res, next) => { 
    const images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }))

    const place = new Place(req.body.place);
    place.author = req.user._id
    place.images = images;


    await place.save();
    req.flash('success_msg', 'Place added Successfully')
    res.redirect('/places')
}

module.exports.show = async (req, res) => {

    const { id } = req.params;
    const place = await Place.findById(id)
        .populate({
            path:'reviews',
            populate:{
                path:'author'
            }
        })
        .populate('author');  
    res.render('places/show', { place })
}

module.exports.edit = async (req, res) => {
    // console.log(req.params.id)
    const place = await Place.findById(req.params.id);
    
    res.render('places/edit', { place })
}
module.exports.update = async (req, res) => {
    const place = await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    console.log(place)
    if(req.files && req.files.length > 0){
        place.images.forEach(image => {
            fs.unlink(image.url, err => new ErrorHandler(err))
        });

        const images = req.files.map(file => ({
            url: file.path,
            filename: file.filename
        }));
        place.images = images;
        await place.save();    
    }

    req.flash('success_msg', 'Place Updated Successfully')
    res.redirect(`/places/${req.params.id}`);
}

module.exports.destroy = async (req, res) => {
    const {id} = req.params
    const place = await Place.findById(id);

    if(place.images.length > 0){
        place.images.forEach(image => {
            fs.unlink(image.url, err => new ErrorHandler(err))
        });
    }

    await place.deleteOne();

    req.flash('success_msg', 'Place Deleted Successfully')
    res.redirect('/places')
}

module.exports.destroyImage = async(req, res)=>{
    try {
        const {id} = req.params;
        const {images}= req.body;

        if (!images || images.length ==0) {
            req.flash('error_msg', 'Please select at least one image');
            return res.redirect(`/places/${id}/edit`)
        }

        images.forEach(image=>{
            fs.unlinkSync(image)
        });

        await Place.findByIdAndUpdate(
            id,
            {$pull: {images:{url :{$in:images}}}}
        )
        req.flash('success_msg', 'Successfully deleted images');
        return res.redirect(`/places/${id}/edit`);

    } catch (error) {
        const {id} = req.params;
        req.flash('error_msg', 'Failed to delete images');
        return res.redirect(`/places/${id}/edit`);
    }
}
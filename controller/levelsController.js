const Levels = require('../models/levels.js')


module.exports.index = async (req, res) => {
    try {
        const levels = await Levels.find({  });
        res.render('levels/index', { levels });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.store = async (req, res, next) => { 
    console.log(req.body.level)
    // const images = req.files.map(file => ({
    //     url: file.path,
    //     filename: file.filename
    // }))

    const level = new Levels(req.body.level);

    await level.save();
    req.flash('success_msg', 'level added Successfully')
    res.redirect('/levels')
}


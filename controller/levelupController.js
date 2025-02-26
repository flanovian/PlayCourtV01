const UserLevel = require('../models/userLevel')

module.exports.index = async (req, res) => {
    try {
        const userLevels = await UserLevel.find({}).populate('user_id');
        
        res.render('levelup/index', { userLevels });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.show = async (req, res) => {
    try {
        const {userId} = req.params;
        const mylevel = await UserLevel.find({user_id: userId}).populate("level_id");

        // Format URL untuk video
        // mylevel.forEach(item => {
        //     if (item.matchVideo) {
        //         item.matchVideo.url = `http://${req.get('host')}/videos/${item.matchVideo.filename}`;
        //     }
        // });
       
        res.render('mylevel/index', { mylevel });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

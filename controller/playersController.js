const User = require('../models/user')


module.exports.index = async (req, res) => {
    try {
        const players = await User.find({  });
        res.render('players/index', { players });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


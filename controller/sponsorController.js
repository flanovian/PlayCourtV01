const User = require('../models/sponsor')


module.exports.index = async (req, res) => {
    try {
        const sponsor = await User.find({  });
        res.render('sponsor/index', { sponsor });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


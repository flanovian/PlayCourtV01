const mongoose = require('mongoose')

module.exports = (redirectUrl)=>{
    return async(req, res, next)=>{
        const paramId = ['id', 'tournament_id', 'level_id'].find(param => req.params[param]);
        if (!paramId) {
            return next();
        }

        const id = req.params[paramId];
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error_msg', 'Invalid Id / Data Tidak ditemukan');
            return res.redirect(redirectUrl);            
        }

        next();
    }
}
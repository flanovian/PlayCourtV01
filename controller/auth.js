// Models
const User = require('../models/user');

module.exports.registerForm = (req, res) => {    
    res.render('auth/register');
}

module.exports.register = async (req, res) => {
    try {        
        const profileImages = {
            url: req.file.path,
            filename: req.file.filename
        };
        const { fullname, phone, playArea, gender, email, instagram, username, password } = req.body;

        const user = new User({
            fullname,
            phone,
            playArea,
            gender,
            email,
            instagram,            
            username
        });
        user.profilePic =  profileImages;
        user.userType = 2


        const registeredUser = await User.register(user, password);

        // Login otomatis setelah registrasi berhasil
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success_msg', 'You are registered and logged in');
            res.redirect('/');
        });

    } catch (error) {
        req.flash('error_msg', error.message);
        res.redirect('/register');
    }
};

module.exports.loginForm = (req, res) => {    
    res.render('auth/login', { 
        successMessage: req.flash('success') || "",
        errorMessage: req.flash('error') || ""});
}



module.exports.login = (req, res)=>{
    req.flash('success_msg', 'You are logged in');
    res.redirect('/');
}

module.exports.logout = (req, res)=>{
    req.logout(function(err) {
        if (err) {
            return next(err)                    
        }else{
            req.flash('success_msg', 'You are logged out')
            res.redirect('/login')
        }
    })
}
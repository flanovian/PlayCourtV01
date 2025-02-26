const Joi = require('joi')

module.exports.tournamentSchema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        sportCategory: Joi.string().required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        maxPlayer: Joi.number().integer().min(1).required(),
        setPlay: Joi.number().integer().min(1).required(),
        startRegister: Joi.date().required(),
        endRegister: Joi.date().required(),
        startMatch: Joi.date().required(),
        endMatch: Joi.date().required(),
        finalDate: Joi.date().required(),
        status: Joi.string().required(),
        images: Joi.string().optional(), 
        author: Joi.string().required(),
        maxLevel: Joi.string().required(),
        contact: Joi.string().required(),
        description : Joi.string().required(),
    
    }).required();



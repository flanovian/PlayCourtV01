const Joi = require('joi');

module.exports.levelSchema = Joi.object({   
    matchVideo: Joi.string().uri().required() 
    
}).required();

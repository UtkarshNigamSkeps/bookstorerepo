const Joi = require('joi')

const signUpSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    name: Joi.string().min(1).required(),
    role: Joi.string().allow('customer','admin')
})



module.exports=signUpSchema
const Joi = require('joi')

const bookSchema=Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    genre: Joi.string().required()
})

module.exports=bookSchema

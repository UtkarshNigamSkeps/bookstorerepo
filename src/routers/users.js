//Routers for users

const express=require('express');
const User=require('../models/users') //Acqiring user model
const signUpSchema=require('../middleware/joi_signup')
const loginSchema=require('../middleware/joi_login')
const router= new express.Router()



//POST route for registering a user
router.post('/auth/register', async(req,res)=>{
    const user= new User(req.body)

    const {err,value}= signUpSchema.validate(req.body)

    if(err){
        return res.status(404).send(err.message)
    }
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(404).send(e.message)
    }
})


//POST route for login 
router.post('/auth/login', async (req, res) => {

    const {err,value}= loginSchema.validate(req.body)
    if(err){
        return res.status(404).send(err.message)
    }
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        res.status(404).send(e.message)
    }
})


module.exports=router;
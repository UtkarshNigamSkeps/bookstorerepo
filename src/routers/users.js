//Routers for users

const express=require('express');
const path= require('path')
const User=require('../models/users') //Acqiring user model
const bodyParser=require('body-parser')
const signUpSchema=require('../middleware/joi_signup')
const loginSchema=require('../middleware/joi_login')
const router= new express.Router()


router.use('/static',express.static(path.join(__dirname,'../templates')))
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/auth/register',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/register.html'))
})

// router.get('/auth/login',async(req,res)=>{
//     res.sendFile(path.join(__dirname,'../templates/login.html'))
// })

//POST route for registering a user
router.post('/auth/register', async(req,res)=>{
    const data ={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    const user= new User(data)

    const {err,value}= signUpSchema.validate(req.body)

    if(err){
        return res.status(404).send(err.message)
    }
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send('User Registered Successfully')
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
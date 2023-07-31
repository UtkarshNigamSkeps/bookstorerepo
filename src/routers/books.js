//Routers for book

const express=require('express')
const axios=require('axios')
const Book=require('../models/books') //Acquiring book model
const Transaction=require('../models/transaction')
const auth=require('../middleware/auth') //Acquiring auth
const bookSchema=require('../middleware/joi_book')
const logger=require('../logger')
const router=new express.Router();



// GET route for gettting all books in the bookstore(Admin and Customer)
router.get('/books',auth,async (req,res)=>{
    try{
        const books=await Book.find()
        res.status(200).send(books)
    }catch(e){
        res.status(404).send(e.message)
    }
})

//POST route for adding books(Admin only)
router.post('/books',auth,async (req,res)=>{
    const book=new Book(req.body)
    const {err,value}=bookSchema.validate(req.body)

    if(err){
        return res.status(404).send(err.message)
    }

    if(req.role==='customer'){
        return res.status(404).send('You cannot perform this operation.')
    }
    try{
        await book.save()
        res.status(200).send(book)
    }catch(e){
        res.status(404).send(e.message)
    }
})


//GET route for getting a book by specific id(Admin only)
router.get('/books/:id',auth,async (req,res)=>{
    const _id=req.params.id
    if(req.role==='customer'){
        return res.status(404).send('You cannot perform this operation.')
    }
    try{
        const book= await Book.findById(_id)
        res.status(200).send(book)
    }catch(e){
        res.status(404).send(e.message)
    }
})


//PUT route for updating any specific book(Admin only)
router.put('/books/:id',auth,async(req,res)=>{
    const _id=req.params.id
    if(req.role==='customer'){
        return res.status(404).send('You cannot perform this operation.')
    }
    try{
        const book= await Book.findByIdAndUpdate(_id,req.body)
        res.status(200).send('Updated Successfully.')
    }catch(e){
        res.status(404).send(e.message)
    }
})


//DELETE route for deleting a book(Only admin)
router.delete('/books/:id',auth,async(req,res)=>{
    const _id=req.params.id
    if(req.role==='customer'){
        return res.status(404).send('You cannot perform this operation.')
    }
    try{
        const book= await Book.findByIdAndDelete(_id)
        res.status(200).send('Deleted Successfully.')
    }catch(e){
        res.status(404).send(e.message)
    }
})

router.post('/buy/book/:id',auth,async(req,res)=>{
    const _id=req.params.id
    const checkBook=await Book.findById(_id)

    if(!checkBook){
        return res.status(404).send('Book not found.')
    }

    try{
        logger.info(`User ${req.user_id} is attempting to buy book ${req.params.id}.`)
        const data = await axios.post("https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process",req.body)

        if(data.data){
            logger.info(`Payment successfull for User ${req.user_id}.`)
            const temp={
                user_id:req.user_id,
                transaction_id: data.data.payment_id,
                book_id: _id
            }
            const dbTransaction=new Transaction(temp)
            await dbTransaction.save()
            logger.info(`Data saved for User ${req.user_id}`)

            return res.status(200).send(data.data)
        }
        else{
            
            throw new Error('Please check your credentials')
        }
        
        
    }catch(e){
        logger.info(`Something went wrong during payment processing for User ${req.user_id}`)
        res.status(400).send(e.message)
    }
})


module.exports=router;
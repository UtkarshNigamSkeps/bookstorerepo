//Routers for book

const express=require('express')
const Book=require('../models/books') //Acquiring book model
const auth=require('../middleware/auth') //Acquiring auth
const bookSchema=require('../middleware/joi_book')
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


module.exports=router;
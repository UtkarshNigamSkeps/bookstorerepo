const { string } = require('joi');
const mongoose=require('mongoose');

const transactionSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        trim:true
    },
    transaction_id:{
        type:String,
        required:true,
        trim:true
    },
    book_id:{
        type:String,
        required:true,
        trim:true
    }

})

const Transaction=new mongoose.model('Transactions',transactionSchema)
module.exports=Transaction;
const express=require('express'); //Acquiring express
require('./db/mongoose') //Acquiring database through mongoose
const userRouter=require('./routers/users') //acquiring router for users
const bookRouter=require('./routers/books') //acquiring router for books


const app=express(); // initializing express app
const port= 3000; //Defining port

app.use(express.json())
app.use(userRouter)
app.use(bookRouter)



//Starting express server on 3000 port
app.listen(port,()=>{
    console.log('Server is up on port: '+ port)
})
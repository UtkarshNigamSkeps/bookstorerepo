const mongoose=require('mongoose');

const connectionURL='mongodb://127.0.0.1:27017/bookCollection?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';

mongoose.connect(connectionURL).then(()=>{
    console.log('Databse is connected!')
}).catch(()=>{
    console.log('Error: Database is not connected')
})
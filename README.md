#BookStore Project

Please install all required packages from 'package.json' file and setup node environment accordingly.
Set up the database connection in 'db/mongoose.js' file and connect to the database.
Then start express server by running 'index.js' file.
Open Postman to start hitting api.
I have started my server in localhost:3000 , change it according to you in 'index.js' file.

#APIs call

-POST /auth/register => to register a new user with defined schema of {name,email,password}, please note there is one optional field of {role} whose value is 'customer' by default. If you are registering as 'admin', plese add role field also during registration.

-POST /auth/login => to login which requires only following schema:{email,password}. Copy your jwt token and use it for authorization for hitting below APIs.

-GET /books => to get details of all the books. For hitting this api you need to put token value with key Authorization in header section of Postman.This will be use for authentication and verify that you are 'customer' or 'admin'.

-POST /books => to add a new book to the collection with a defined schema{title,author,genre,price,stock}. This is only valid for admin.

-GET /books/:id => to get the details of specific book by id. Only valid for admin.

-PUT /books/:id => to update any specific book by id. Note that if you want to update single field of a book you have to provide whole book schema correctly.Only valid for admin.

-DELETE /books/:id => to delete any specific book. Only valid for admin.
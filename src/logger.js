const winston = require('winston');
const logger = winston.createLogger({
    transports: [

        new winston.transports.File({ filename: 'src/logs/buy-book.log'})

    ],

  format: winston.format.combine(

    winston.format.timestamp(),

    winston.format.json()

  ),

});


module.exports = logger;
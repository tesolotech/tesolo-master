    const express = require('express');

    const bodyParser = require('body-parser');
    
    // create express app
    const app = express();

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))

    // parse requests of content-type - application/json
    app.use(bodyParser.json());

    const mongoose = require('mongoose');

    // Configuring the database
    const dbConfig = require('./dbconfig/database.config.js');
        
    // mongoose.connect('mongodb://localhost:27017/easy-notes');
    
    mongoose.Promise = global.Promise;

    // Connecting to the database
    mongoose.connect(dbConfig.url, {
            useNewUrlParser: true,
            useCreateIndex:true,
            useUnifiedTopology: true,
            promiseLibrary: global.Promise,            
            }).then(() => {
                 console.log("Successfully connected to the database");    
            }).catch(err => {
                 console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
    });

     // Handling CORS error     
    app.use((req,res,next)=>{
          res.header('Access-Control-Allow-Origin','*');
          res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Content-Type, Accept, Authorization');
          if(res.method === 'OPTIONS'){
               res.header('Access-Control-Allow-Methods', 'PUT, GET, DELETE, POST, PATCH');
               return res.status(200).json({});
          }
          next();
    });

//     //Handling all types of error
//     app.use((req,res,next)=>{
//      const error = new Error('Not Found');
//           error.status(400);
//           next(error);
//     });

    //Generally handle db error
//     app.use((error,req,res,next)=>{
//           res.status(error.status || 500);
//           res.json({error:{message:error.message}});
//     });



    app.set('port', process.env.PORT || 3000);

    // Require Notes routes
    require('./app/routes/note.routes.js')(app);
    // Require Users routes
    require('./app/routes/user.routes.js')(app);

    app.listen(app.get('port'), () => console.log(`Server is listening on port ${app.get('port')}`));


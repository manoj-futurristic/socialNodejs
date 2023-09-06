const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./utils/swagger'); 


const cors = require('cors');
const env = require('dotenv');
env.config();

const errHandler = require('./handlers/errorHandler');
const connectDB = require('./app/database');
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const swaggerJsdoc = require('swagger-jsdoc');
   const options = {
     definition: {
       openapi: '3.0.0',
       info: {
         title: 'Social Node js',
         version: '1.0.0',
         description: 'API documentation for your Node.js project',
       },
       servers: [
         {
           url: 'http://localhost:4500', // Update with your server URL
         },
       ],
     },
     apis: ['app.js'], // Update with your route file paths
     basePath: '/', 
   };

   const specs = swaggerJsdoc(options);


  console.log(specs);

app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /test:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
const userRouter = require('./app/routers/userRouter');
app.use('/auth', userRouter);

const postRouter = require('./app/routers/postRouter');
app.use('/post',postRouter);



app.use(errHandler);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, (err) => {
            if (err) throw err;
            console.log(`Server is up and running on ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};



// /**
//  * @swagger
//  * /test:
//  *   get:
//  *     description: Welcome to swagger-jsdoc!
//  *     responses:
//  *       200:
//  *         description: Returns a mysterious string.
//  */
//  app.get('/test', (req, res) => {
//     res.send('Hello World!');
//   });




  app.use("*", (req, res, next) => {
    const error = {
        status: false,
        message: "Endpoint_Not_Found"
    };
    res.status(404).json(error);
});

start();
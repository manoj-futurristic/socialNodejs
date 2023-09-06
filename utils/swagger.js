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
     apis: ['../app/routers/userRouter.js'], // Update with your route file paths
     basePath: '/', 
   };

   const specs = swaggerJsdoc(options);

   module.exports = specs;

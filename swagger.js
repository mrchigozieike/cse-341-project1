const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts',
  },
  host: 'localhost:3000',  
  schemes: ['http'],       
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js', './routes/users.js', ]; // Include all route files

swaggerAutogen(outputFile, routes, doc);

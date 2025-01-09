const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my project',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./pages/api/*.js'], // Path to your API files
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Export Swagger setup
module.exports = { swaggerUi, swaggerSpec };

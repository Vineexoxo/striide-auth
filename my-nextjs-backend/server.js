const express = require('express');
const next = require('next');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API Documentation',
      version: '1.0.0',
      description: 'This is a simple CRUD API using Next.js',
    },
  },
  apis: ['./pages/api/**/*.js'], // Path to API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.prepare().then(() => {
  const server = express();

  // Enable CORS
  server.use(cors({
    origin: 'http://localhost:3000',
  }));

  // Parse JSON request bodies
  server.use(express.json());

  // Use Swagger UI
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // API routes
  server.post('/api/signup', require('./pages/api/signup').default);
  server.post('/api/login', require('./pages/api/login').default);

  // Catch-all for Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});

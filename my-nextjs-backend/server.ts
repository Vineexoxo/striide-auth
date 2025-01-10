import express, { Request, Response } from 'express';
import 'tsconfig-paths/register';


const next = require('next');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Importing your API route handlers
import signup from './pages/api/signup';
import login from './pages/api/login';
import updateProfile from './pages/api/entry'; // Import the update profile handler


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
  server.post('/api/signup', async (req: Request, res: Response) => {
    try {
      await signup(req, res);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // TypeScript now knows that err is an instance of Error
        res.status(500).json({ message: 'Internal server error', error: err.message });
      } else {
        // In case the error is not an instance of Error
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  });
  server.post('/api/login', async (req: Request, res: Response) => {
    try {
      await login(req, res);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  });

  // API route for updating the user profile
  server.put('/api/entry', async (req: Request, res: Response) => {
    try {
      await updateProfile(req, res);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  });

  // Catch-all for Next.js pages
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3001, (err?: Error) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});

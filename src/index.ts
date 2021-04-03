// Import Request and Response type definitions from express library
// so we can use them as req and res types
import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';

// Initialize express
const app = express();

// Use router object to get access to defined routes
app.use(router);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

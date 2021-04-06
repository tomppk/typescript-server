// Import Request and Response type definitions from express library
// so we can use them as req and res types
import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

// Initialize express
const app = express();

// Enable parsing of form data with POST request
// Allows access to req.body of form data for POST routes
app.use(bodyParser.urlencoded({ extended: true }));

// Adds session property to our request object
app.use(cookieSession({ keys: ['somerandomstring'] }));

// Use router object to get access to defined routes
app.use(router);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

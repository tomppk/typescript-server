import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';

// Middleware to check if user is logged in
// If logged in then proceed to next() function and don't return anything
// If not logged in return 403 Forbidden and message
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

// Set root route for class as '' empty string because we use '/' already
// with @get('/') otherwise the route would be double slash '//'
@controller('')
class RootController {
  // Add type guard to check if there is req.session and if its
  // loggedIn property is true
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/auth/login">Login</a>
      </div>
    `);
    }
  }

  // use decorator to wire up middleware requireAuth
  // Route protected with requireAuth middleware that checks if user is logged in
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route, logged in user');
  }
}

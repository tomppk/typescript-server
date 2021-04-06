import { Router, Request, Response, NextFunction } from 'express';

// Add custom interface with req.body property defined properly
// In express type definition file at Request it is defined as body: any
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

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

// Initialize Router instance
const router = Router();

// Add type guard to check if there is req.session and if its
// loggedIn property is true
router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are not logged in</div>
      <a href="/login">Login</a>
    </div>
  `);
  }
});

// autocomplete="off" disables browser Chrome autocomplete
// and suggestions for form fields
router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST" autocomplete="off">
      <div>
        <label>Email<label>
        <input name="email" />
      </div>
      <div>
        <label>Password<label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

// req.body is available because form data is parsed using
// body-parser npm library
router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  // Hardcode email and password values
  if (email && password && email === 'hi@hi.com' && password === 'password') {
    // mark user as logged in
    // define req.session property as object with loggedIn
    // property set to true
    req.session = { loggedIn: true };

    // Redirect back to root route
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

// Reset req.session cookie that logs user out
router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

// Route protected with requireAuth middleware that checks if user is logged in
router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user');
});

export { router };

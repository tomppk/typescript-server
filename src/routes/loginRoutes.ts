import { Router, Request, Response } from 'express';

// Add custom interface with req.body property defined properly
// In express type definition file at Request it is defined as body: any
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
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

// Reset req.session cookie
router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', (req: Request, res: Response) => {
  res.send('Protected area');
});

export { router };

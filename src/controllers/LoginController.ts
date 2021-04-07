import { Request, Response, Router, NextFunction } from 'express';
import { get, controller, bodyValidator, post } from './decorators';

@controller('/auth')
class LoginController {
  // autocomplete="off" disables browser Chrome autocomplete
  // and suggestions for form fields
  // @get decorator adds metadata property 'path': '/login' to getLogin() method
  @get('/login')
  getLogin(req: Request, res: Response): void {
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
  }

  // req.body is available because form data is parsed using
  // body-parser npm library
  // Use @post decorator and add route as argument
  // Use @bodyValidator to check that req.body has 'email' and 'password'
  // properties or keys
  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    // Hardcode email and password values
    if (email === 'hi@hi.com' && password === 'password') {
      // mark user as logged in
      // define req.session property as object with loggedIn
      // property set to true
      req.session = { loggedIn: true };

      // Redirect back to root route
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }
}

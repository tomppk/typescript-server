import { Request, Response, Router, NextFunction } from 'express';
import { get, controller } from './decorators';

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
}

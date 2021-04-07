import { Request, Response, Router, NextFunction } from 'express';

class LoginController {
  // autocomplete="off" disables browser Chrome autocomplete
  // and suggestions for form fields
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

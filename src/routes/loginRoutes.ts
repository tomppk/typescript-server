import { Router, Request, Response } from 'express';

// Initialize Router instance
const router = Router();

router.get('/', (req, res) => {
  res.send('hi there');
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
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send(email + password);
});

export { router };

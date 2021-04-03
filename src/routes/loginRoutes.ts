import { Router } from 'express';

// Initialize Router instance
const router = Router();

router.get('/', (req, res) => {
  res.send('hi there');
});

export { router };

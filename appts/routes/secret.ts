import express, { Request, Response, NextFunction } from 'express';
let router = express.Router();

// Middleware function to check session
const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session['login'] === true) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(401).redirect('/login'); // Send 401 Unauthorized status
  }
};

/* GET users listing. */
router.get('/', checkSession, function(req: Request, res: Response, next: NextFunction) {
  res.send('This a super secret route!');
});

module.exports = router;

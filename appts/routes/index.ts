import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.redirect('/login');
});

module.exports = router;

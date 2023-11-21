import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.session['views']) {
    req.session['views']++
  } else {
    req.session['views'] = 1
  }
  res.render('index', { title: 'Express', views: req.session['views'], expire: req.session.cookie.maxAge });
  
 
});

module.exports = router;

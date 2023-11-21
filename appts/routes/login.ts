import express, { Request, Response, NextFunction } from 'express';
let router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session['login'] === true) {
        res.redirect('/secret');
    } else {
        res.render('login', { title: 'Login' });
    }
});

router.post('/', function(req: Request, res: Response, next: NextFunction) {
    if (req.body.username === 'admin' && req.body.password === 'admin') {
        req.session['login'] = true;
        res.status(200).json({ message: 'Login successful', path: '/secret' });
    } else {
        res.status(401).json({ message: 'Login failed' });
    }
});

module.exports = router;
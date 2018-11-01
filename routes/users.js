var express = require('express');
var router = express.Router();

const jwt = require('../helpers/jwt');

const routeGuard = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    const validToken = jwt.validate(token[1]);
    if (validToken.success) {
      req.app.locals.usuario = validToken.payload;
      next();
    } else {
      res.sendStatus(403).send();
    }
  } else {
    res.sendStatus(403).send();
  }
}

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/apilogin',(req, res) => {
  res.json({token: jwt.generate({user: 'Jorge'})});
});

router.get('/info', routeGuard, (req, res) => {
  console.log(req.usuario);
  res.send('aqui va mi info');
});


module.exports = router;

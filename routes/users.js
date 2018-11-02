var express = require('express');
var router = express.Router();

const jwt = require('../helpers/jwt');
const userController = require('../controllers/userController');

const routeGuard = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    const validToken = await jwt.validate(token[1]);
    if (!validToken.error) {
      res.user = validToken.payload.user;
      next();
    } else {
      res.sendStatus(403).send();
    }
  } else {
    res.sendStatus(403).send();
  }
}

router.get('/', userController.index);

router.post('/apilogin',(req, res) => {
  jwt.generate({user_id: 1}).then(token => res.json({token}));
});

router.get('/info', routeGuard, (req, res) => {
  console.log(res.user);
  res.send('aqui va mi info');
});


module.exports = router;

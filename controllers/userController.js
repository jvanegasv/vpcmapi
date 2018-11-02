const userModel = require('../models').userModel;

const jwt = require('../helpers/jwt');
const wordPress = require('../helpers/wordPress');

const UserController = {

    index: (req, res) => {
        res.json(res.user);
    },

    login: async (req, res) => {
      const result = await wordPress.validateUser(req.body.username,req.body.password);
      if (!result.error) {
        const token = await jwt.generate({user_id: result.user.ID});
        res.json({token});
      } else {
          res.json({error: true, error_message: 'Invalid username or password'});
      }
    },

    apilogin: async (req, res) => {
        const result = await userModel.apiLogin(req.body.apikey,req.body.apipwd);
        if (!result.error) {
            const token = await jwt.generate({user_id: result.user.user_id});
            res.json({token});
        } else {
            res.json({error: true, error_message: 'Invalid username or password'});
        }
    },

    info: (req, res) => {

    },

    update: (req, res) => {

    },

    routeGuard: async (req, res, next) => {

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
}

module.exports = UserController;
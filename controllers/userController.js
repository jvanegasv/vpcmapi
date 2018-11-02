const userModel = require('../models').userModel;

const wordPress = require('../helpers/wordPress');

const UserController = {

    index: (req, res) => {

        userModel.getBy('user_id',1).then(result => console.log(result));
        wordPress.validateUser('jvanegasv@gmail.com','#H3g0y465').then(result => console.log('WP user validation: ',result));
        res.send('respond with a resource');      

    }
}

module.exports = UserController;
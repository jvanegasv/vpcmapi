const userModel = require('../models/userModel');

const UserController = {

    index: (req, res) => {

        userModel.getBy('user_id',1).then(result => console.log(result));
        res.send('respond with a resource');      

    }
}

module.exports = UserController;
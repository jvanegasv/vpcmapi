const db = require('../models');

const hasher = require('wordpress-hash-node');

const wordPress = {

    validateUser: async (username, password) => {

        let toReturn = {
            error: true
        };

        const user = await db.getBySql(`select * from ${ db.wordpressPrefix }users where user_login = '${ username }'`);
        if (!user.error) {
            if (user.result.length > 0) {
                const checked = hasher.CheckPassword(password, user.result[0].user_pass); //This will return true
                if (checked) {
                    toReturn.error = false;
                    toReturn.user = user.result[0];
                }
            }
        }

        return toReturn;
    }
}

module.exports = wordPress;
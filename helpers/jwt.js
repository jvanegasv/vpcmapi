const JWT = require('jsonwebtoken');

const tokenSecret = "#H3g0y465";
const jwt = {

    generate: (payload) => {
        return JWT.sign(payload,tokenSecret);
    },

    validate: (token) => {

        const toReturn = {
            success: false
        }

        try {
            var decoded = JWT.verify(token, tokenSecret);
            toReturn.success = true;
            toReturn.payload = decoded;
        } catch(err) {
            toReturn.success = false;
        }        

        return toReturn;
    }
}

module.exports = jwt;
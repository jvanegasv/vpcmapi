const JWT = require('jsonwebtoken');

const tokenSecret = require('../config').jwtSecret;
const Db = require('../models');

const jwt = {

    // user_id REQUIRED in order to generate the token
    // token payload example { user_id: 1, token_id: 5, iat: 1541159130 }
    generate: async (payload) => {
        const jwt_id = await Db.insertData('jwts',{
            jwt_user: payload.user_id
        });

        if (jwt_id.error) {
            return '';
        } else {
            payload.token_id = jwt_id.result;
            const token = JWT.sign(payload,tokenSecret);
    
            Db.updateData('jwts',{ jwt_token: token},'jwt_id = ' + jwt_id.result);
            return token;
        }
    },

    // return payload plus user object otherwise error = true
    validate: async (token) => {

        const toReturn = {
            error: false
        }

        try {
            var decoded = JWT.verify(token, tokenSecret);
            const result = await Db.getBySql(`select users.* from jwts, users where jwt_user = user_id and jwt_id = ${ decoded.token_id } and jwt_valid = 1`);
            if (result.error){
                toReturn.error = true;
            } else {
                if (result.result.length > 0) {
                    decoded.user = result.result[0];
                    toReturn.payload = decoded;
                } else {
                    toReturn.error = true;
                }
            }
        } catch(err) {
            toReturn.error = true;
        }        

        return toReturn;
    }
}

module.exports = jwt;
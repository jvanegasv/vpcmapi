const Db = require('./index');

const tableName = 'users';

const UserModel = {

    getBy: async (byKey, byValue) => {

        let toReturn = {
            error: false,
            user: {}
        }

        const result = await Db.getByID(tableName,byKey,byValue);

        if (result.error) {
            toReturn.error = result.error;
        } else {
            if (result.result.length > 0) {
                toReturn.user = result.result[0];
            }
        }
        return toReturn;
    }
}

module.exports = UserModel;
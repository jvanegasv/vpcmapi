class userModel {

    constructor(DBLINK) {
        this.Db = DBLINK;
        this.tableName = 'users';
    }

    async getBy(byKey, byValue) {

        let toReturn = {
            error: false,
            user: {}
        }

        const result = await this.Db.getByID(this.tableName,byKey,byValue);

        if (result.error) {
            toReturn.error = result.error;
        } else {
            if (result.result.length > 0) {
                toReturn.user = result.result[0];
            }
        }

        return toReturn;
    };
}

module.exports = userModel;
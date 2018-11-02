class userModel {

    constructor(DBLINK) {
        this.Db = DBLINK;
        this.tableName = 'users';
    }

    async getBy(byKey, byValue) {

        let toReturn = {
            error: true,
            user: {}
        }

        const result = await this.Db.getByID(this.tableName,byKey,byValue);

        if (!result.error) {
            if (result.result.length > 0) {
                toReturn.error = false;
                toReturn.user = result.result[0];
            }
        }

        return toReturn;
    };

    async apiLogin(apiKey, apiPwd) {

        let toReturn = {
            error: true,
            user: {}
        }
        const data = await this.Db.getBySql(`select * from users where user_api_key = '${ apiKey }' and user_api_pwd = '${ apiPwd}'`);
        if (!data.error) {
            if (data.result.length > 0) {
                toReturn.error = false;
                toReturn.user = data.result[0];
            }
        }

        return toReturn;
    }
}

module.exports = userModel;
class UserModel {

    constructor(DBLINK){

        this.sequelize = DBLINK.sequelize;
        this.getBySql = DBLINK.getBySql;
        this.getById = DBLINK.getById;
        this.insertData = DBLINK.insertData;
        this.updateData = DBLINK.updateData;
        this.deleteData = DBLINK.deleteData;

        this.variable = 0;
    }

    login(username, password) {

        console.log('me llamaron y el var es ' , this.variable);
    }

    async apiLogin(apiKey, apiPwd) {

        let toReturn = {
            success: false
        }

        console.log('mi variable es ', this.variable);
        this.variable++;
        

        try {
            const result = await this.getBySql(`select *
            from users
            where user_api_key = '${ apiKey }'
            and user_api_pwd = '${ apiPwd }'`);
    
            if (result.length > 0) {
                toReturn.success = true;
                toReturn.user = result[0]
            }

        } catch(error) {
            toReturn.error = error;
        }

        console.log('ahora mi var es ', this.variable);
        this.login();

        return toReturn;
    }
    
}

module.exports = UserModel;
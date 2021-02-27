const user = require("../user/user");

module.exports = function makeListUser({list}){
    return async function listUser(httpRequest){
        try{
            const userList = await list();
            return {
                headers: {
                'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: { userList : userList.map(user => {
                   return user = {...user, ...{password:undefined}}
                })}
            }
        }catch(e){
            return {
              headers: {
                'Content-Type': 'application/json'
              },
              statusCode: 400,
              body: {
                error: e.message
              }
            }
        }
    }
}
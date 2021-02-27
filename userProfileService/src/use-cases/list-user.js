module.exports = function makeListUser({usersDb}){
    return async function list(){
        const userList = await usersDb.findAll();
        return userList;
    }
}
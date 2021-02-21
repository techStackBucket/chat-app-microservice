const makeUser = require('../user');


module.exports = function makeAddUser({usersDb}){
    return async function addUser(userInfo){
        const user = makeUser(userInfo);
        const exists = await usersDb.findByEmail({ email: user.getEmail() })
        if (exists) {
            throw new Error('The email address is already used.')
        }

        return usersDb.insert({
            id: user.getId(),
            name: user.getName(),
            surname: user.getSurname(),
            nickName: user.getNickName(),
            email: user.getEmail(),
            gender: user.getGender(),
            age: user.getAge(),
            password: user.getPassword(),
            createdOn: user.getCreatedOn(),
            modifiedOn: user.getModifiedOn(),
          })
    }
}
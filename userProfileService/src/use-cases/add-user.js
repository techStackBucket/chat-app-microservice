const makeUser = require('../user');

module.exports = function makeAddUser({usersDb, isEmpty}){
    return async function insert(userInfo){
        const user = makeUser(userInfo);
        const exist = await usersDb.findByEmail({ email: user.getEmail() })
        
        if (exist && !isEmpty(exist)) {
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
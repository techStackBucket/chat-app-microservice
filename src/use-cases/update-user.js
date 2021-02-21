const makeUser = require('../user')
module.exports = function makeUpdateUser({usersDb}){
    return async function updateUser({ id, ...changes } = {}){
        if (!id) {
            throw new Error('You must supply an id.')
        }
        const existing = await usersDb.findById({ id })
        
        if (!existing) {
            throw new RangeError('User not found.');
        }
        
        const user = makeUser({ ...existing, ...changes, modifiedOn : undefined });
        
        const updated = await usersDb.update({
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
          
          return { ...existing, ...updated }
    }
}
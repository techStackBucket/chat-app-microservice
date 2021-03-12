const makeUser = require('../user')
module.exports = function makeUpdateUser({usersDb}){
    return async function update({ userId, ...changes } = {}){
        if (!userId) {
            throw new Error('You must supply an id.')
        }
        const existing = await usersDb.findById({ userId })
        
        if (!existing) {
            throw new RangeError('User not found.');
        }
        
        const user = makeUser({ ...existing, ...changes, modifiedOn : undefined });
        
        const updated = await usersDb.update({
            id: user.getId(),
            userId: user.getUserId(),
            name: user.getName(),
            surname: user.getSurname(),
            nickName: user.getNickName(),
            email: user.getEmail(),
            gender: user.getGender(),
            age: user.getAge(),
            createdOn: user.getCreatedOn(),
            modifiedOn: user.getModifiedOn(),
          })
          
          return { ...existing, ...updated }
    }
}
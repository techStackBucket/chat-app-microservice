module.exports = function buildMakeUser({Id, md5, validation}){
    return function makeUser({
        name,
        surname,
        email,
        nickName,
        createdOn = Date.now(),
        id = Id.makeId(),    
        modifiedOn = Date.now(),
        age,
        gender,
        isDeleted = false
    }={}){
        if (!Id.isValidId(id)) {
            throw new Error('Uniq id must be generated.')
          }
          if(!userId){
            throw new Error('User must have an id.')
          }
          if (!name) {
            throw new Error('User must have a name.')
          }
          if (!surname) {
            throw new Error('User must have a surname.')
          }
          if (!email) {
            throw new Error('User must have an email.')
          }
          if (!validation(email, 1)) {
            throw new Error('User must have a valid email.')
          }

          return Object.freeze({
            getName: () => name,  
            getSurname: () => surname,  
            getFullName: () => name + " " + surname,
            getNickName: ()=> nickName,
            getCreatedOn: () => createdOn,
            getId: () => id,
            getUserId: ()=> userId,
            getEmail:()=> email,
            getGender: ()=> gender,
            getAge: ()=> age,
            getModifiedOn: () => modifiedOn,
            isDelete: ()=> isDeleted,
            markDeleted: () => {
              isDeleted = true
            }
          })
    }
}
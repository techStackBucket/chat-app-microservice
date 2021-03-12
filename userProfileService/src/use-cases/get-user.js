module.exports = function makeGetUser({usersDb}){
    return async function get({userId} = {}){
        if(!userId){
            throw new Error('You must supply an id.')
        }

        const user = await usersDb.findById({ userId })

        // if (!user) {
        //     throw new RangeError('User not found.');
        // }

        return user;
    }
}
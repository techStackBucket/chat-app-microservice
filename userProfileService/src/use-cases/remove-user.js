module.exports = function makeRemoveUser({usersDb}){
    return async function remove({ userId } = {}){
        if (!userId) {
            throw new Error('You must supply a user id.')
        }

        const user = await usersDb.findById({ userId })

        if (!user) {
            return removeNothing()
        }

        return hardDelete(userId);
    }

    function removeNothing () {
        return {
          deletedCount: 0,
          message: 'User not found, nothing to delete.'
        }
    }
    async function hardDelete (userId) {
        await usersDb.remove({userId})
        return {
          deletedCount: 1,
          message: 'User deleted.'
        }
    }
}
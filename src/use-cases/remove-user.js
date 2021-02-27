module.exports = function makeRemoveUser({usersDb}){
    return async function remove({ id } = {}){
        if (!id) {
            throw new Error('You must supply a user id.')
        }

        const user = await usersDb.findById({ id })

        if (!user) {
            return removeNothing()
        }

        return hardDelete(id);
    }

    function removeNothing () {
        return {
          deletedCount: 0,
          message: 'User not found, nothing to delete.'
        }
    }
    async function hardDelete (id) {
        await usersDb.remove({id})
        return {
          deletedCount: 1,
          message: 'User deleted.'
        }
    }
}
module.exports = function makeDeleteUser({remove}){
    return async function deleteUser(httpRequest){
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const deleted = await remove({ userId: httpRequest.params.id })
            return {
              headers,
              statusCode: deleted.deletedCount === 0 ? 404 : 200,
              body: { deleted }
            }
        } catch (e) {
            // TODO: Error logging
            console.log(e)
            return {
              headers,
              statusCode: 400,
              body: {
                error: e.message
              }
            }
        }
    }
}
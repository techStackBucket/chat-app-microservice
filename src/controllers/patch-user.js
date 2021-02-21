module.exports = function makePatchUser({updateUser}){
    return async function patchUser(httpRequest){
        try{
            const { ...userInfo } = httpRequest.body;
            const patched = await updateUser({
                ...userInfo,
                id: httpRequest.params.id
            })
            return {
                headers: {
                'Content-Type': 'application/json',
                'Last-Modified': new Date(patched.modifiedOn).toUTCString()
                },
                statusCode: 200,
                body: { patched }
            }
        }catch(e){
            console.log(e)
            if (e.name === 'RangeError') {
                return {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  statusCode: 404,
                  body: {
                    error: e.message
                  }
                }
              }
            return {
              headers: {
                'Content-Type': 'application/json'
              },
              statusCode: 400,
              body: {
                error: e.message
              }
            }
        }
    }
}
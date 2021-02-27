module.exports = function makePostUser({insert}){
    return async function postUser(httpRequest){
        try{
            const { ...userInfo } = httpRequest.body;
            const posted = await insert({
                ...userInfo
            })
            return {
                headers: {
                'Content-Type': 'application/json',
                'Last-Modified': new Date(posted.modifiedOn).toUTCString()
                },
                statusCode: 201,
                body: { posted }
            }
        }catch(e){
            console.log(e)
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
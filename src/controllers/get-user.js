module.exports = function makeGetUser({get}){
  return async function getUser(httpRequest){
      try{
          const userId = httpRequest.params.id;
          const user = await get({userId})
          return {
              headers: {
              'Content-Type': 'application/json',
              },
              statusCode: 200,
              body: { ...user, ...{ password : undefined } }
          }
      }catch(e){
          // console.log(e)
          // if (e.name === 'RangeError') {
          //     return {
          //       headers: {
          //         'Content-Type': 'application/json'
          //       },
          //       statusCode: 404,
          //       body: {
          //         error: e.message
          //       }
          //     }
          //   }
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
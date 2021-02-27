const makePatchUser = require('./patch-user');
const makeFakeUser = require('../../__test__/fixtures/user.js');

describe('patch user controller', () => {
  it('successfully patches a user', async () => {
    const fakeUser = makeFakeUser()
    const patchUser = makePatchUser({ update: c => c })
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'user-id':'12345'
      },
      params: {
        id: fakeUser.id
      },
      body: fakeUser
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(fakeUser.modifiedOn).toUTCString()
      },
      statusCode: 200,
      body: { patched: request.body }
    }
    const actual = await patchUser(request)
    expect(actual).toEqual(expected)
  })
//   it('reports user errors', async () => {
//     const fakeComment = makeFakeComment()
//     const patchComment = makePatchComment({
//       editComment: () => {
//         throw Error('Pow!')
//       }
//     })
//     const request = {
//       headers: {
//         'Content-Type': 'application/json',
//         Referer: fakeComment.source.referrer,
//         'User-Agent': fakeComment.source.browser
//       },
//       params: {
//         id: fakeComment.id
//       },
//       body: fakeComment
//     }
//     const expected = {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       statusCode: 400,
//       body: { error: 'Pow!' }
//     }
//     const actual = await patchComment(request)
//     expect(actual).toEqual(expected)
//   })
})

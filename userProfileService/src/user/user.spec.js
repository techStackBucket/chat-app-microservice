const makeUser = require('./')
const fakeUser = {
    name:"",
    surname:""
}

describe('user', () => {
    it('must have a name', () => {
        expect(() => makeUser(fakeUser)).toThrow('User must have a name.');
    })
});
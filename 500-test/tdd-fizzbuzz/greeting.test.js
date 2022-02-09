const greeting = guest => `Hello, ${guest}!`

// greeting() says hello
describe('greeting()', () => {
    it('says hello', () => {
        expect(greeting('Hoge')).toBe('Hello, Hoge!') //creates an assertion
    })
})
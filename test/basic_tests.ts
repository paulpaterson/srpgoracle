import {getGreeting} from "../src/common";

describe('A simple test', () => {
    test('one', () => {
        expect(10).toEqual(10);
    })
    test('greeting', () => {
        expect(getGreeting('bob')).toEqual('Hello, bob! Welcome to the app.')
    })
})
import {randomElement, randomNumber} from "../src/common";

describe('A simple test', () => {
    test('one', () => {
        expect(10).toEqual(10);
    })
})

describe('Random number tests', () => {
    test('Should be between 1 and max', () => {
        let seen: Set<number> = new Set<number>();

        // Collect some data
        for (let idx = 0; idx < 1000; idx++) {
            let answer = randomNumber(10);
            seen.add(answer);
            expect(answer).toBeGreaterThanOrEqual(1);
            expect(answer).toBeLessThanOrEqual(10);
        }

        // Check all members seen
        for (let idx = 1; idx <= 10; idx++) {
            expect(seen).toContain(idx);
        }
    })
})

describe('Random element tests', () => {
    test('Should be from array', () => {
        let seen: Set<string> = new Set<string>();
        let items = ['one', 'two', 'three', 'four', 'five'];

        // Collect some data
        for (let idx = 0; idx < 1000; idx++) {
            let answer = randomElement(items);
            seen.add(answer);
            expect(items).toContain(answer);
        }

        // Check all members seen
        expect(seen.size).toEqual(items.length);
    })
})
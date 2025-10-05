import {randomNumber} from "../src/common";

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
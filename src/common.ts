export function getGreeting(name: string): string {
    console.log('getGreeting');
    return `Hello, ${name}! Welcome to the app. v2.1.3`;
}

// Return a random number between 1 and the max
export function randomNumber(max: number): number {
    return Math.floor(1 + Math.random() * max);
}

// Return a random element from a list
export function randomElement(list: Array<string>): string {
    let idx = randomNumber(list.length);
    return list[idx - 1];
}


export function getGreeting(name: string): string {
    console.log('getGreeting');
    return `Hello, ${name}! Welcome to the app. v2.1.3`;
}

// Return a random number between 1 and the max
export function randomNumber(max: number, min: number = 1): number {
    return Math.floor(min + Math.random() * (max - min + 1));
}

// Return a random element from a list
export function randomElement(list: Array<string>): string {
    let idx = randomNumber(list.length);
    return list[idx - 1];
}


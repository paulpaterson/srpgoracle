export function getGreeting(name: string): string {
    return `Hello, ${name}! Welcome to the app. v2.1.3`;
}

export function randomNumber(max: number): number {
    return Math.floor(1 + Math.random() * max);
}
function getGreeting(name: string): string {
    return `Hello, ${name}! Welcome to the app.`;
}

const userName = "Bobby";
const messageElement = document.getElementById("message");
const messageElement2 = document.getElementById("footer");

if (messageElement) {
    messageElement.textContent = getGreeting(userName);
}
if (messageElement2) {
    messageElement2.textContent = getGreeting('Footer');
}

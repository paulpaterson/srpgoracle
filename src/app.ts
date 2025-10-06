import {getGreeting, randomElement, randomNumber} from "./common";
import {ALL_CHOICES, showChoices} from "./ui";



document.addEventListener("DOMContentLoaded", () => {
    const userName = "Bobby";
    const messageElement = document.getElementById("message");
    const messageElement2 = document.getElementById("footer");

    if (messageElement) {
        messageElement.textContent = getGreeting(userName);
    }
    if (messageElement2) {
        messageElement2.textContent = getGreeting(`number ${randomNumber(10)}`);
    }

    for (let opt of ALL_CHOICES.getTypesOfChoice()) {
        showChoices('choices', 'one', opt);
    }
})


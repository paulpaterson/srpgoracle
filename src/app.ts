import {getGreeting, randomElement, randomNumber} from "./common";
import {ALL_CHOICES, showChoices} from "./ui";



document.addEventListener("DOMContentLoaded", () => {

    for (let opt of ALL_CHOICES.getTypesOfChoice()) {
        showChoices('choices', 'one', opt);
    }
})


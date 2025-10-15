import {getGreeting, randomElement, randomNumber} from "./common";
import {ALL_CHOICES, showChoices, showGroup} from "./ui";
import {GROUPS} from "./content";



document.addEventListener("DOMContentLoaded", () => {

    if (document.URL.endsWith('composite.html')) {

    } else {
        for (let opt of ALL_CHOICES.getTypesOfChoice()) {
            showChoices('choices', 'one', opt);
        }
        for (let item of GROUPS.getGroupNames()) {
            showGroup('groups', 'two', item);
        }
    }
})


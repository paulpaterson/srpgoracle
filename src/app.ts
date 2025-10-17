import {getGreeting, randomElement, randomNumber} from "./common";
import {ALL_CHOICES, showChoices, showGroup, showStats} from "./ui";
import {COMPOSITE_SUCCESS, GROUPS} from "./content";



document.addEventListener("DOMContentLoaded", () => {

    if (document.URL.endsWith('composite.html')) {
        showStats('stats');
        showSkillCheckedChoice('choices', 'one', COMPOSITE_SUCCESS);
    } else {
        for (let opt of ALL_CHOICES.getTypesOfChoice()) {
            showChoices('choices', 'one', ALL_CHOICES.getChoiceNamed(opt));
        }
        for (let item of GROUPS.getGroupNames()) {
            showGroup('groups', 'two', item);
        }
    }
})


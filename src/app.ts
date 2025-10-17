import {getGreeting, randomElement, randomNumber} from "./common";
import {ALL_CHOICES, showChoices, showGroup, showSkillCheckedChoice, showStats} from "./ui";
import {COMPOSITE_SUCCESS, GROUPS} from "./content";
import {loadStats} from "./persistence";



document.addEventListener("DOMContentLoaded", () => {

    if (document.URL.endsWith('composite.html')) {
        loadStats().then(() => {
            showStats('stats');
            showSkillCheckedChoice('choices', 'one', COMPOSITE_SUCCESS);
        });
    } else {
        for (let opt of ALL_CHOICES.getTypesOfChoice()) {
            showChoices('choices', 'one', ALL_CHOICES.getChoiceNamed(opt));
        }
        for (let item of GROUPS.getGroupNames()) {
            showGroup('groups', 'two', item);
        }
    }
})


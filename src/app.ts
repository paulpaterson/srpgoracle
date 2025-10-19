import {getGreeting, randomElement, randomNumber} from "./common";
import {ALL_CHOICES, showChoices, showGroup, showSelectableDecisions, showSkillCheckedChoice, showStats} from "./ui";
import {ATTRIBUTES, COMPOSITE_SUCCESS, GROUPS, STATS} from "./content";
import {loadStats} from "./persistence";



document.addEventListener("DOMContentLoaded", () => {

    if (document.URL.endsWith('composite.html')) {
        loadStats().then(() => {
            showStats('stats', STATS, true);
            showStats('attributes', ATTRIBUTES, false);
            showSkillCheckedChoice('choices', 'one', COMPOSITE_SUCCESS);
            showSelectableDecisions('decisions');
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


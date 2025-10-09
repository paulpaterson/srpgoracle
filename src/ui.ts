import {randomElement, randomNumber} from "./common";


class Option {
    name: string;
    valid_in: string[];

    constructor(name: string, valid_in?: string[]) {
        this.name = name;
        if (valid_in) {
            this.valid_in = valid_in;
        } else {
            this.valid_in = [];
        }
    }

    isValidFor(modifier: string): boolean {
        return (modifier == 'All' || this.valid_in.includes(modifier));
    }
}

class Choice {
    name: string;
    options: Option[];

    constructor(name: string, options: Option[]) {
        this.name = name;
        this.options = options;
    }

    getChoices(modifier: string): string[] {
        let results = [];
        for (let opt of this.options) {
            if (opt.isValidFor(modifier)) {
                results.push(opt.name);
            }
        }
        return results;
    }

    getModifiers(): string[] {
        let results: string[] = ['All'];
        for (let opt of this.options) {
            for (let mod of opt.valid_in) {
                if (!results.includes(mod)) {
                    results.push(mod);
                }
            }
        }
        return results;
    }
}

class Choices {
    options: Record<string, Choice>;
    constructor() {
        this.options = {};
    }

    addChoice(choice: Choice) {
        this.options[choice.name] = choice;
    }

    getChoiceNamed(name: string): Choice {
        return this.options[name];
    }

    getTypesOfChoice(): string[] {
        return Object.keys(this.options);
    }
}

export let ALL_CHOICES = new Choices();

function O(name: string, valid_in?: string[]): Option {
    return new Option(name, valid_in);
}

ALL_CHOICES.addChoice(new Choice(
    "Succeed", [
        O('Yes, and then some', ['easy']),
        O('Yes', ['easy']),
        O('Yes, with complications', ['easy', 'hard']),
        O('Almost but not quite', ['easy', 'hard']),
        O('No', ['hard']),
        O('No and it gets even worse', ['hard']),
]));

ALL_CHOICES.addChoice(new Choice(
    "Person", [
        O('Younger man', ['man']),
        O('Younger woman', ['woman']),
        O('Man', ['man']),
        O('Woman', ['woman']),
        O('Older man', ['man']),
        O('Older woman', ['woman']),
        O('Teenager male', ['young']),
        O('Teenager female', ['young']),
        O('Child male', ['young']),
        O('Child female', ['young']),
]));

ALL_CHOICES.addChoice(new Choice(
    "Disposition", [
        O('Friendly', ['Mostly positive']),
        O('Open', ['Mostly positive']),
        O('Neutral', ['Mostly positive', 'Mostly negative']),
        O('Wary', ['Mostly positive', 'Mostly negative']),
        O('Suspicious', ['Mostly negative']),
        O('Angry', ['Mostly negative']),
]));

ALL_CHOICES.addChoice(new Choice(
    "Character", [
        O('Extraverted'),
        O('Introverted'),
        O('Sensing'),
        O('Intuitive'),
        O('Thinking'),
        O('Feeling'),
        O('Judging'),
        O('Perceiving'),
]));

ALL_CHOICES.addChoice(new Choice(
    "Sex", [
        O("Male"),
        O("Female"),
]));

ALL_CHOICES.addChoice(new Choice(
    "True or not", [
        O("Yes"),
        O("No"),
]));

ALL_CHOICES.addChoice(new Choice(
    "How many", [
        O("None", ["up to a few"]),
        O("One", ["up to a few", "at least some"]),
        O("A few", ["up to a few", "at least some"]),
        O("More than a few", ["at least some"]),
        O("Lots", ["at least some"]),
]));

ALL_CHOICES.addChoice(new Choice(
    "Complication", [
        O("A Person", ["concrete"]),
        O("A thing", ["concrete"]),
        O("An opportunity", ["concept"]),
        O("An emotion", ["concept"]),
        O("An event", ["concept"]),
        O("A disaster", ["concept"]),
]));

ALL_CHOICES.addChoice(new Choice(
    "Humor", [
        O("Physical", []),
        O("Slapstick", []),
        O("Edge/Offensive", []),
        O("Gallows or Dark", []),
        O("Deadpan or Dry", []),
        O("Satirical/Parody/Spoof", []),
        O("Wordplay", []),
        O("Witty or Highbrow", []),
        O("Ironic", []),
        O("Bodily/Earthy/Lowbrow", []),
]));

ALL_CHOICES.addChoice(new Choice(
    "Quests", [
        O("Heist or infiltration", []),
        O("Break a siege", []),
        O("Scout or spy mission", ['non-fantasy']),
        O("Monster hunt or drive dangers out", []),
        O("Investigate danger, crime", ['non-fantasy']),
        O("Discover or find a lost item", ['non-fantasy']),
        O("Fetch quest", ['non-fantasy']),
        O("Escort or delivery mission", ['non-fantasy']),
        O("Obtain a treasure that is guarded", ['non-fantasy']),
        O("Lift a curse or deal with cursed item", []),
        O("Disaster, plague, strange weather etc", []),
        O("Deal with injustice or fight polical corruption", ['non-fantasy']),
        O("Enchanted journey", []),
]));


export function getSuccess(element: HTMLSelectElement, type_name: string, modifier: string) {
    let result: string;
    result = randomElement(ALL_CHOICES.getChoiceNamed(type_name).getChoices(modifier));
    if (element) {
        element.value = result;
    }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function repeatedlyCall(min_times: number, max_times: number, element: HTMLSelectElement, type_name: string, modifier: string) {
    let times = randomNumber(max_times, min_times);
    for (let idx = 0; idx < times; idx++) {
        console.log(`Calling function for iteration ${idx+1}`);
        if (element) {
            getSuccess(element, type_name, modifier);
        }
        await sleep(100);
    }
}

export function showChoices(element_name: string, id: string, type_name: string) {
    let parent_element = document.getElementById(element_name);
    if (parent_element) {

        let element = document.createElement('div');
        element.className = 'card';
        parent_element.appendChild(element);

        // The select option
        let name = document.createElement('div');
        name.className = "card-header";
        name.textContent = type_name;
        element.appendChild(name);

        let card = document.createElement('div');
        card.className = "card-body";
        element.appendChild(card);

        let group = document.createElement('div');
        group.className = "input-group align-items-center";
        card.appendChild(group);

        let button = document.createElement('button')
        button.textContent = 'Get';
        button.addEventListener('click', handleClick);
        button.type = "submit";
        button.className = "btn btn-primary";


        group.appendChild(button);

        // Things that modify the options
        let modifiers = document.createElement('select');
        modifiers.className = "form-select";
        let modifier_id = `modifier-${type_name}`;
        modifiers.setAttribute('id', modifier_id);

        let mod_label = document.createElement('label');
        mod_label.textContent = 'With modifier';
        mod_label.setAttribute('for', modifier_id);
        mod_label.className = "px-3";
        group.appendChild(mod_label);

        // The modifiers
        for (let mod of ALL_CHOICES.getChoiceNamed(type_name).getModifiers()) {
            let opt = document.createElement('option')
            opt.textContent = mod;
            opt.value = mod;
            modifiers.appendChild(opt);
        }
        modifiers.addEventListener("click", handleModifierSelect);
        group.appendChild(modifiers);

        // The result options
        let result_id = `result-${type_name}`;
        let result_label = document.createElement('label');
        result_label.textContent = 'Answer is';
        result_label.setAttribute('for', modifier_id);
        result_label.className = "px-3";
        group.appendChild(result_label);

        let result = document.createElement('select');
        result.className = "form-select w-50";
        result.setAttribute('id', result_id);
        group.appendChild(result);
        let choices = ALL_CHOICES.getChoiceNamed(type_name);
        for (let opt of choices.getChoices('All')) {
            let option = document.createElement('option');
            option.textContent = opt;
            result.appendChild(option);
        }

        function handleClick(event: MouseEvent): void {
          repeatedlyCall(10, 20, result, type_name, modifiers.value);
        }

        function handleModifierSelect(event: MouseEvent): void {
            let select_value_is_disabled = false;
            let first_valid;
            for (let opt of result.options) {
                opt.disabled = !(choices.getChoices(modifiers.value).includes(opt.value))
                if (opt.value == result.value && opt.disabled) {
                    select_value_is_disabled = true;
                }
                if (!opt.disabled && !first_valid) {
                    first_valid = opt;
                }
            }
            // Check if we need to fill in a value
            if (select_value_is_disabled) {
                if (first_valid) {
                    result.value = first_valid.value;
                } else {
                    result.value = '';
                }
            }
        }
    }
}
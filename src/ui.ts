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
]));

ALL_CHOICES.addChoice(new Choice(
    "Disposition", [
        O('Friendly'),
        O('Open'),
        O('Neutral'),
        O('Wary'),
        O('Suspicious'),
        O('Angry'),
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
        O("An opportunity", ["concrete"]),
        O("A Person", ["concrete"]),
        O("A thing", ["concrete"]),
        O("An emotion", ["concept"]),
        O("An event", ["concept"]),
        O("A disaster", ["concept"]),
]));


export function getSuccess(element: HTMLElement, type_name: string, modifier: string) {
    let result: string;
    result = randomElement(ALL_CHOICES.getChoiceNamed(type_name).getChoices(modifier));
    if (element) {
        element.textContent = result;
    }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function repeatedlyCall(min_times: number, max_times: number, element: HTMLElement, type_name: string, modifier: string) {
    let times = randomNumber(max_times, min_times);
    for (let idx = 0; idx < times; idx++) {
        console.log(`Calling function for iteration ${idx+1}`);
        if (element) {
            getSuccess(element, type_name, modifier);
        }
        await sleep(100);
    }
}

export function showChoices(element_name: string, id: string, type_name?: string) {
    let element = document.getElementById(element_name);
    if (element) {

        // The select option
        let select = document.createElement('select');
        select.setAttribute('id', id);
        element.appendChild(select);
        for (let option of ALL_CHOICES.getTypesOfChoice()) {
            let opt = document.createElement('option')
            opt.textContent = option;
            opt.value = option;
            if (type_name && type_name == option) {
                opt.setAttribute('selected', "true");
            }
            select.appendChild(opt);
        }

        let modifiers = document.createElement('select');
        element.appendChild(modifiers);
        if (type_name) {
            // The modifiers
            for (let mod of ALL_CHOICES.getChoiceNamed(type_name).getModifiers()) {
                let opt = document.createElement('option')
                opt.textContent = mod;
                opt.value = mod;
                modifiers.appendChild(opt);
            }
        }

        let button = document.createElement('button')
        button.textContent = 'Get';
        button.addEventListener('click', handleClick)
        element.appendChild(button);

        let result = document.createElement('div');
        result.textContent = '?';
        element.appendChild(result);

        function handleClick(event: MouseEvent): void {
          repeatedlyCall(10, 20, result, select.value, modifiers.value);
        }
    }
}
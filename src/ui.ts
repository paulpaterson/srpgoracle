import {randomElement, randomNumber} from "./common";

class Choice {
    name: string;
    options: string[];

    constructor(name: string, options: string[]) {
        this.name = name;
        this.options = options;
    }

    getChoices(): string[] {
        return this.options;
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

let ALL_CHOICES = new Choices();

ALL_CHOICES.addChoice(new Choice(
    "Succeed", [
        'Yes, and then some',
        'Yes',
        'Yes, with complications',
        'Almost but not quite',
        'No',
        'No and it gets even worse',
]));

ALL_CHOICES.addChoice(new Choice(
    "Person", [
        'Younger man',
        'Younger woman',
        'Man',
        'Woman',
        'Older man',
        'Older woman',
]));

ALL_CHOICES.addChoice(new Choice(
    "Disposition", [
        'Friendly',
        'Open',
        'Neutral',
        'Wary',
        'Suspicious',
        'Angry',
]));

ALL_CHOICES.addChoice(new Choice(
    "Character", [
        'Extraverted',
        'Introverted',
        'Sensing',
        'Intuitive',
        'Thinking',
        'Feeling',
        'Judging',
        'Perceiving',
]));

ALL_CHOICES.addChoice(new Choice(
    "Sex", [
        "Male",
        "Female",
]));

ALL_CHOICES.addChoice(new Choice(
    "True or not", [
        "Yes",
        "No",
]));

ALL_CHOICES.addChoice(new Choice(
    "How many", [
        "None",
        "One",
        "A few",
        "More than a few",
        "Lots",
]));

ALL_CHOICES.addChoice(new Choice(
    "Complication", [
        "An opportunity",
        "A Person",
        "A thing",
        "An emotion",
        "An event",
        "A disaster",
]));


export function getSuccess(element: HTMLElement, type_name: string) {
    let result: string;
    result = randomElement(ALL_CHOICES.getChoiceNamed(type_name).getChoices());
    if (element) {
        element.textContent = result;
    }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function repeatedlyCall(min_times: number, max_times: number, element: HTMLElement, type_name: string) {
    let times = randomNumber(max_times, min_times);
    for (let idx = 0; idx < times; idx++) {
        console.log(`Calling function for iteration ${idx+1}`);
        if (element) {
            getSuccess(element, type_name);
        }
        await sleep(100);
    }
}

export function showChoices(element_name: string, id: string) {
    let element = document.getElementById(element_name);
    if (element) {
        let select = document.createElement('select');
        select.setAttribute('id', id);
        element.appendChild(select);
        for (let option of ALL_CHOICES.getTypesOfChoice()) {
            let opt = document.createElement('option')
            opt.textContent = option;
            opt.value = option;
            select.appendChild(opt);
        }
        let button = document.createElement('button')
        button.textContent = 'Get';
        button.addEventListener('click', handleClick)
        element.appendChild(button);

        let result = document.createElement('div');
        result.textContent = '?';
        element.appendChild(result);

        function handleClick(event: MouseEvent): void {
          repeatedlyCall(10, 20, result, select.value);
        }
    }
}
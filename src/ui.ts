import {randomElement, randomNumber} from "./common";

export let types: Record<string, string[]> = {
    "Succeed": [
        'Yes, and then some',
        'Yes',
        'Yes, with complications',
        'Almost but not quite',
        'No',
        'No and it gets even worse',
    ],
    "Person": [
        'Younger man',
        'Younger woman',
        'Man',
        'Woman',
        'Older man',
        'Older woman',
    ],
    "Disposition": [
        'Friendly',
        'Open',
        'Neutral',
        'Wary',
        'Suspicious',
        'Angry',
    ],
    "Character": [
        'Extraverted',
        'Introverted',
        'Sensing',
        'Intuitive',
        'Thinking',
        'Feeling',
        'Judging',
        'Perceiving',
    ],
    "Sex": [
        "Male",
        "Female",
    ],
    "True or not": [
        "Yes",
        "No",
    ],
    "How many": [
        "None",
        "One",
        "A few",
        "More than a few",
        "Lots",
    ],
    "Complication": [
        "An opportunity",
        "A Person",
        "A thing",
        "An emotion",
        "An event",
        "A disaster",
    ],
}

export function getSuccess(element: HTMLElement, type_name: string) {
    let result: string;
    result = randomElement(types[type_name]);
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
        for (let option of Object.keys(types)) {
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
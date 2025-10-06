import {randomElement, randomNumber} from "./common";

export let types = ["Succeed", "Person", "Disposition"];

export function getSuccess(element_name: string, type_name: string) {
    const success = document.getElementById(element_name);
    let options = {
        'success_options': [
            'Yes, in excess of expectations',
            'Yes',
            'Yes, but with complications',
            'Almost but not quite',
            'No',
            'It goes horribly wrong',
        ],
        'person_options': [
            'older woman',
            'woman',
            'younger woman',
            'younger man',
            'man',
            'older man',
        ],
    };
    let result: string;
    switch (type_name) {
        case 'success_options':
            result = randomElement(options['success_options']);
            break;
        case 'person_options':
            result = randomElement(options['person_options']);
            break;
        default:
            throw new Error('No such option type');
        }
    if (success) {
        success.textContent = result;
    }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function repeatedlyCall(min_times: number, max_times: number, element_name: string, type_name: string) {
    let times = randomNumber(max_times, min_times);
    for (let idx = 0; idx < times; idx++) {
        console.log(`Calling function for iteration ${idx+1}`);
        getSuccess(element_name, type_name);
        await sleep(100);
    }
}

export function showChoices(element_name: string, id: string) {
    let element = document.getElementById(element_name);
    if (element) {
        let select = document.createElement('select');
        select.setAttribute('id', id);
        element.appendChild(select);
        for (let option of types) {
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
          result.textContent = `You clicked me with selection ${select.value}`;
        }
    }
}
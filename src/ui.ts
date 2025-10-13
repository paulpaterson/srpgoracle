import {randomElement, randomNumber} from "./common";
import {ALL_CHOICES} from "./content";
export { ALL_CHOICES};


export function getSuccess(element: HTMLSelectElement, type_name: string, modifier: string) {
    let result: string;
    result = randomElement(ALL_CHOICES.getChoiceNamed(type_name).getChoices(modifier));
    if (element) {
        element.value = result;
    }
}

export function chooseNext(element: HTMLSelectElement): void {
    let current_idx = element.selectedIndex;
    while (true) {
        current_idx += 1;

        // Reached the end?
        if (current_idx >= element.options.length) {
            current_idx = -1;
            continue
        }

        // Fell on a disabled option?
        if (element.options[current_idx].disabled) {
            continue;
        }

        element.selectedIndex = current_idx;
        return
    }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function repeatedlyCall(min_times: number, max_times: number, element: HTMLSelectElement, type_name: string, modifier: string) {
    let times = randomNumber(max_times, min_times);
    let time_step = 10;
    for (let idx = 0; idx < times; idx++) {
        console.log(`Calling function for iteration ${idx+1}`);
        if (element) {
            chooseNext(element);
        }
        await sleep(time_step);
        time_step += 10;
    }
}

export function showChoices(element_name: string, id: string, type_name: string) {
    let parent_element = document.getElementById(element_name);
    if (parent_element) {
        let QUESTION = ALL_CHOICES.getChoiceNamed(type_name);

        let element = document.createElement('div');
        element.className = 'card pb-5';
        parent_element.appendChild(element);

        // The select option
        let name = document.createElement('h4');
        name.className = "card-header";
        element.appendChild(name);
        let icon = document.createElement('i');

        icon.className = `bi bi-${QUESTION.icon} px-3`;
        name.appendChild(icon);
        let main_label = document.createElement('label');
        main_label.textContent = QUESTION.description;
        name.appendChild(main_label);

        let card = document.createElement('div');
        card.className = "card-body";
        element.appendChild(card);

        let group = document.createElement('div');
        group.className = "input-group align-items-center";
        card.appendChild(group);

        let button = document.createElement('button')
        button.textContent = 'Ask ...';
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
          repeatedlyCall(20, 30, result, type_name, modifiers.value);
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
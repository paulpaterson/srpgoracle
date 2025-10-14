import {randomElement, randomNumber} from "./common";
import {ALL_CHOICES, GROUPS} from "./content";
import {Choice, ChoiceGroup} from "./choices";
import {Button, Div, Heading, Icon} from "./components";
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

        let element = new Div({classes: 'card pb-5'}).appendTo(parent_element);

        // The select option
        let name = document.createElement('h4');
        name.className = "card-header";
        element.appendChild(name);

        let icon = new Icon({icon_name: QUESTION.icon, classes: 'px-3'}).appendTo(name);

        let main_label = document.createElement('label');
        main_label.textContent = QUESTION.description;
        name.appendChild(main_label);

        let card = new Div({classes: 'card-body'}).appendTo(element);
        let group = new Div({classes: "input-group align-items-center"}).appendTo(card);
        let button = new Button({text: 'Ask ...'}).appendTo(group);
        button.element.addEventListener('click', addChoiceBody(group.element, type_name));
    }
}

function addChoiceBody(group: HTMLElement, type_name: string) {
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

    return handleClick;
}

type click_handler = (event: MouseEvent) => void;

export function showGroup(element_name: string, id: string, item: string): void {
    let group = GROUPS.getGroupNamed(item);
    let parent_element = document.getElementById(element_name);
    let click_handers = new Array<click_handler>();
    if (parent_element) {
        // The main header for the group
        let element = new Div({classes: 'card pb-5'}).appendTo(parent_element);

        // The select option
        let name = new Heading({level: 4, classes: 'card-header', text_content: item + '   '}).appendTo(element);

        let card = new Div({classes: "card-body"}).appendTo(element);

        // The individual items
        for (let choice of group) {
            let group = new Div({classes: "input-group align-items-center py-1"}).appendTo(card);
            let icon = new Icon({icon_name: choice.icon, classes: 'px-3'}).appendTo(group);
            new Heading({level: 4, text_content: choice.name, style: 'width: 150px'}).appendTo(group);

            let handleClick = addChoiceBody(group.element, choice.name);
            click_handers.push(handleClick);
        }


        new Button({text:'Ask ...', on_click: handleAllClicks}).appendTo(name);

        // Call all the handlers of all the choices
        function handleAllClicks(event: MouseEvent): void {
            for (let handler of click_handers) {
                handler(event);
            }
        }
    }
}

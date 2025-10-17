import {randomElement, randomNumber} from "./common";
import {ALL_CHOICES, GROUPS, STATS} from "./content";
import {Choice, ChoiceGroup} from "./choices";
import {Button, Div, Heading, Icon, Label, Option, Select, Input} from "./components";
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

export function showChoices(element_name: string, id: string, choice: Choice) {
    let parent_element = document.getElementById(element_name);
    if (parent_element) {
        let element = new Div({classes: 'card pb-5'}).appendTo(parent_element);

        // The select option
        let name = new Heading({level: 4, classes: 'card-header', text_content: ''}).appendTo(element);
        let icon = new Icon({icon_name: choice.icon, classes: 'px-3'}).appendTo(name);
        let main_label = new Label({text_content: choice.description}).appendTo(name);
        let card = new Div({classes: 'card-body'}).appendTo(element);
        let group = new Div({classes: "input-group align-items-center"}).appendTo(card);
        let button = new Button({text: 'Ask ...'}).appendTo(group);
        button.element.addEventListener('click', addChoiceBody(group.element, choice));
    }
}

function addChoiceBody(group: HTMLElement, choice: Choice) {
    let type_name = choice.name;

    // Things that modify the options
    let modifiers = new Select({classes: 'form-select'}).element;
    let modifier_id = `modifier-${type_name}`;
    modifiers.setAttribute('id', modifier_id);

    let mod_label = new Label({text_content: 'With modifier', for_id: modifier_id, classes: 'px-3'}).appendTo(group);

    // The modifiers
    for (let mod of choice.getModifiers()) {
        let opt = new Option({text_content: mod, value: mod}).appendTo(modifiers);
    }
    modifiers.addEventListener("click", handleModifierSelect);
    group.appendChild(modifiers);

    // The result options
    let result_id = `result-${type_name}`;
    let result_label = new Label({text_content: 'Answer is', for_id: modifier_id, classes: 'px-3'}).appendTo(group);

    let result = new Select({classes: 'form-select w-50'}).appendTo(group).element;
    result.setAttribute('id', result_id);

    for (let opt of choice.getChoices('All')) {
        let option = new Option({text_content: opt}).appendTo(result);
    }

    function handleClick(event: MouseEvent): void {
      repeatedlyCall(20, 30, result, type_name, modifiers.value);
    }

    function handleModifierSelect(event: MouseEvent): void {
        let select_value_is_disabled = false;
        let first_valid;
        for (let opt of result.options) {
            opt.disabled = !(choice.getChoices(modifiers.value).includes(opt.value))
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

            let handleClick = addChoiceBody(group.element, choice);
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

export function showStats(element_name: string) {
    let root = document.getElementById(element_name);
    let values: Record<string, HTMLInputElement> = {};

    if (root) {
        let card_header = new Heading({level: 4, classes: 'card-header', text_content: 'Stats     '}).appendTo(root);
        let reroll = new Button({button_type: 'submit', text: 'Reroll'}).appendTo(card_header);
        let card_body = new Div({classes: 'card-body container'}).appendTo(root);

        for (let the_stat of STATS.stats) {
            let group = new Div({classes: "input-group align-items-center row py-1"}).appendTo(card_body);
            let col1 = new Div({classes: 'col-2'}).appendTo(group);
            let col2 = new Div({classes: 'col-2'}).appendTo(group);
            let label = new Label({text_content: the_stat.name, classes: 'px-3', for_id: the_stat.name});
            let input = new Input({value: the_stat.value.toString(), classes: 'form-control'});
            input.element.setAttribute('id', the_stat.name);
            col1.appendChild(label.element);
            col2.appendChild(input.element);
            //
            values[the_stat.name] = input.element;
        }
        //
        reroll.element.addEventListener('click', () => updateStats());
    }

    function updateStats() {
        STATS.rerollStats();
        for (let the_stat of STATS.stats) {
            values[the_stat.name].value = the_stat.value.toString();
        }
    }

}
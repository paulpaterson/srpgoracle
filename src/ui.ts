import {randomNumber} from "./common";
import {ALL_CHOICES, DEFAULT_NUMBER_OF_POINTS, DEFAULT_STAT, GROUPS, STATS} from "./content";
import {Choice, Stats} from "./choices";
import {Button, Div, Heading, Icon, Label, Option, Select, Input} from "./components";
import {storeStats} from "./persistence";
export { ALL_CHOICES};



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

export async function repeatedlyCall(min_times: number, max_times: number, element: HTMLSelectElement) {
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

function showChoiceHeader(parent_element: HTMLElement, id: string, choice: Choice) {
        let element = new Div({classes: 'card pb-5'}).appendTo(parent_element);
        let name = new Heading({level: 4, classes: 'card-header', text_content: ''}).appendTo(element);
        let main_label = new Label({text_content: choice.description, icon_name: choice.icon}).appendTo(name);
        let card = new Div({classes: 'card-body'}).appendTo(element);
        return new Div({classes: "input-group align-items-center"}).appendTo(card);
}

export function showChoices(element_name: string, id: string, choice: Choice) {
    let parent_element = document.getElementById(element_name);
    if (parent_element) {
        let group = showChoiceHeader(parent_element, id, choice);
        // The select option
        let button = new Button({text: 'Ask ...'}).appendTo(group);
        button.element.addEventListener('click', addChoiceBody(group.element, choice).handle_click);
    }
}

export function showSkillCheckedChoice(element_name: string, id: string, choice: Choice) {
    let parent_element = document.getElementById(element_name);
    if (parent_element) {
        let group = showChoiceHeader(parent_element, id, choice);
        let button = new Button({text: 'Try', on_click: rollForSuccess}).appendTo(group);
        new Label({text_content: 'Skill', for_id: choice.name,classes: 'px-3'}).appendTo(group);
        let skills = new Select({classes: 'form-select', id: choice.name}).appendTo(group);
        new Option({text_content: 'None', value: 'None'}).appendTo(skills);
        for (let skill of STATS.stats) {
            new Option({text_content: skill.name, value: skill.name}).appendTo(skills);
        }
        let choice_body = addChoiceBody(group.element, choice);

        let new_row = new Div({classes: 'py-3'}).appendTo(group.element.parentElement ?? group);
        let result = new Label({text_content: 'Result ...'}).appendTo(new_row);


        async function rollForSuccess(event: MouseEvent) {
            readStats();
            let the_skill = STATS.getStatNamed(skills.element.value);
            if (the_skill) {
                // A skill was selected
                choice_body.modifier.value = 'All';
                let dice_value = 0;
                for (let roll = 0; roll <= 20; roll++) {
                    dice_value = randomNumber(1, 10);
                    let dice_text = '';
                    if (roll > 0) {
                        dice_text = ` :: D10 Rolls ${dice_value}`;
                    }
                    result.element.textContent = `Rolling for ${the_skill.name} - ${the_skill.value}${dice_text}`;
                    await sleep(100);
                }

                let result_text = '';
                let modifier = '';
                switch (dice_value) {
                    case 1:
                        result_text = 'CRITICAL FAIL';
                        modifier = 'very hard';
                        break;
                    case 10:
                        result_text = 'CRITICAL SUCCESS';
                        modifier = 'very easy';
                        break;
                    case the_skill.value:
                        result_text = 'TIE!';
                        modifier = 'All'
                        break;
                    default:
                        if (dice_value < the_skill.value) {
                            result_text = 'SUCCESS!';
                            modifier = 'easy';
                        } else {
                            result_text = 'FAILURE!';
                            modifier = 'hard';
                        }
                }

                result.element.textContent += ` ... ${result_text} ... sets modifier to ${modifier}`;
                choice_body.modifier.value = modifier;
                choice_body.modifier_select(event);
            }
            await choice_body.handle_click(event);
        }
    }

}

type ChoiceBody = {
    handle_click: (event: MouseEvent) => Promise<void>,
    modifier: HTMLSelectElement,
    modifier_select: (event: MouseEvent) => void,
    choice_finalized?: (result: string) => void,
    result: HTMLSelectElement,
}

function addChoiceBody(group: HTMLElement, choice: Choice): ChoiceBody {
    let type_name = choice.name;

    // Things that modify the options
    let modifier_id = `modifier-${type_name}`;
    let modifiers = new Select({classes: 'form-select', id: modifier_id}).element;

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

    let result = new Select({classes: 'form-select w-40', id: result_id}).appendTo(group).element;

    for (let opt of choice.getChoices('All')) {
        let option = new Option({text_content: opt}).appendTo(result);
    }

    async function handleClick(event: MouseEvent) {
      return repeatedlyCall(20, 30, result);
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

    return {handle_click: handleClick, modifier: modifiers, modifier_select: handleModifierSelect, result: result};
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
            new Heading({level: 4, text_content: choice.name, style: 'width: 150px', icon_name: choice.icon}).appendTo(group);

            let handleClick = addChoiceBody(group.element, choice).handle_click;
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

export function showStats(element_name: string, stats: Stats, show_buttons: boolean) {
    console.log('Showing stats');
    let root = document.getElementById(element_name);
    let values: Record<string, HTMLInputElement> = {};

    if (root) {
        let card_header = new Heading({level: 4, classes: 'card-header align-items-center', text_content: ''}).appendTo(root);
        let input_group = new Div({classes: 'input-group align-items-center py-1'}).appendTo(card_header);
        let heading = new Heading({text_content: stats.name, classes: 'px-3', level: 4}).appendTo(input_group);

        let button_group = new Div({classes: 'btn-group'});
        let clear = new Button({
            button_type: 'submit',
            text: 'Clear',
            classes: 'btn-danger'
        }).appendTo(button_group);
        let reroll = new Button({button_type: 'submit', text: 'Reroll'}).appendTo(button_group);

        let label = new Label({text_content: 'with points', for_id: 'points', classes: 'px-3'});
        let points = new Input({
            value: STATS.getRemainingPoints(DEFAULT_NUMBER_OF_POINTS).toString(),
            classes: 'col-1'
        });

        if (show_buttons) {
            button_group.appendTo(input_group);
            label.appendTo(input_group);
            points.appendTo(input_group);
        }

        let card_body = new Div({classes: 'card-body container'}).appendTo(root);

        for (let the_stat of stats.stats) {
            let group = new Div({classes: "input-group align-items-center row py-1"}).appendTo(card_body);
            let col1 = new Div({classes: 'col-5'}).appendTo(group);
            let col2 = new Div({classes: 'col-5'}).appendTo(group);
            let label = new Label({text_content: the_stat.name, classes: 'px-3', for_id: the_stat.name, icon_name: the_stat.icon});
            let input = new Input({value: the_stat.value.toString(), classes: 'form-control', id: the_stat.name});
            input.element.addEventListener('change', () => {
                readStats();
                points.element.value = STATS.getRemainingPoints(DEFAULT_NUMBER_OF_POINTS).toString();
            });

            col1.appendChild(label);
            col2.appendChild(input);
            //
            values[the_stat.name] = input.element;
        }
        //
        reroll.element.addEventListener('click', () => {
            reroll.element.blur();
            rerollStats(points.element)
        });
        clear.element.addEventListener('click', () => {
            clear.element.blur();
            STATS.clearAll();
            points.element.value = DEFAULT_NUMBER_OF_POINTS.toString();
            updateStats();
            storeStats();
        })

    }

    async function rerollStats(points: HTMLInputElement) {
        let total_points = Number(points.value);
        if (!isNaN(total_points)) {
            for (let i= total_points; i > 0; i--) {
                updateStats();
                await sleep(500);
                STATS.addRandomStat();
                points.value = (i - 1).toString();
            }
        }
        updateStats();
        storeStats();
    }

    function updateStats() {
        for (let the_stat of STATS.stats) {
            values[the_stat.name].value = the_stat.value.toString();
        }
    }
}

function readStats() {
    for (let the_stat of STATS.stats) {
        let the_input = document.getElementById(the_stat.name) as HTMLInputElement;
        if (the_input) {
            let the_value = Number(the_input.value);
            if (!isNaN(the_value)) {
                the_stat.value = the_value;
            }
        }
    }
    storeStats();
}

export function showSelectableDecisions(element_name: string) {
    let element = document.getElementById(element_name);
    if (element) {
        let card = new Div({classes: 'card pb-5'}).appendTo(element);
        let card_header = new Heading({classes: 'card-header align-items-center', level: 4, text_content: ''}).appendTo(card);
        let group = new Div({classes: 'input-group align-items-center py-1'}).appendTo(card_header);
        let heading = new Label({text_content: 'Subsequent Decisions', icon_name: 'signpost-split', for_id: 'possible_decisions', classes: 'pe-3'}).appendTo(group);
        let possible_decisions = new Select({id: 'possible_decisions', classes: 'form-select w-40'}).appendTo(group);

        let the_option = new Option({value: 'Choose', text_content: '-- Choose --'}).appendTo(possible_decisions);
        for (let the_type of ALL_CHOICES.getChoices()) {
            let the_option = new Option({value: the_type.name, text_content: the_type.description}).appendTo(possible_decisions);
        }
        possible_decisions.element.addEventListener('change', showNewChoice);
        let body = new Div({classes: 'card-body', id: 'choice_body'}).appendTo(card);

        function showNewChoice(this: HTMLSelectElement, ev: Event): void {
            possible_decisions.element.blur();
            body.element.replaceChildren();
            let the_choice = ALL_CHOICES.getChoiceNamed(possible_decisions.element.value);
            showChoices('choice_body', '', the_choice);
        }
    }
}
import {randomElement} from "./common";

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

export function repeatedlyCall(min_times: number, max_times: number) {

}
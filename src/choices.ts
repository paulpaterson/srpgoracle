import {randomElement, randomNumber} from "./common";
import {DEFAULT_STAT} from "./content";

export class Option {
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

export class Choice {
    name: string;
    description: string;
    icon: string;
    options: Option[];

    constructor(name: string, description: string, icon: string="award", options: Option[]) {
        this.name = name;
        this.description = description;
        this.options = options;
        this.icon = icon;
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

export class Choices {
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

export class ChoiceGroup {
    groups: Record<string, Choice[]>;

    constructor() {
        this.groups = {};
    }

    getGroupNames(): string[] {
        return Object.keys(this.groups);
    }

    getGroupNamed(name: string): Choice[] {
        return this.groups[name];
    }
}

export function O(name: string, valid_in?: string[]): Option {
    return new Option(name, valid_in);
}


export class Stat {
    name: string;
    value: number;
    icon: string;

    constructor(name: string, value: number, icon: string) {
        this.name = name;
        this.value = value;
        this.icon = icon;
    }

    rerollStats() {
        this.value = randomNumber(10, 1);
    }
}

export class Stats {
    stats: Stat[] = [];

    add(stat: Stat) {
        this.stats.push(stat);
    }

    addRandomStat() {
        let stat = randomElement(this.stats);
        stat.value += 1;
    }

    clearAll() {
        for (let stat of this.stats) {
            stat.value = DEFAULT_STAT;
        }
    }

    getStatNamed(name: string) {
        for (let stat of this.stats) {
            if (stat.name == name) {
                return stat;
            }
        }
        return null;
    }
}
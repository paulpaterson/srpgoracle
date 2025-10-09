
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
    options: Option[];

    constructor(name: string, description: string, options: Option[]) {
        this.name = name;
        this.description = description;
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


export function O(name: string, valid_in?: string[]): Option {
    return new Option(name, valid_in);
}
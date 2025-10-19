/*
Some standard components

 */

interface ElementProps {
    classes?: string;
    style?: string;
    id?: string;
    icon_name?: string;
}

interface SelectProps extends ElementProps {

}

interface IconProps extends ElementProps {
    icon_name: string;
}

interface LabelProps extends ElementProps {
    text_content: string;
    for_id?: string;
}


interface HeadingProps extends ElementProps {
    text_content: string;
    level?: number;

}

interface ButtonProps extends ElementProps{
    text: string;
    button_type?: "submit" | "button" | "reset",
    on_click?: (event: MouseEvent) => void;
}

interface OptionsProps extends ElementProps {
    text_content: string;
    value?: string;
}

interface InputProps extends ElementProps {
    value: string;
}

export class Div {
    element: HTMLElement;
    sub_element: HTMLElement | null = null;

    constructor(options: ElementProps) {
        this.element = document.createElement('div');
        this.finaliseObject(options);
    }

    finaliseObject(options: ElementProps) {
        this.element.className = options.classes ?? '';
        this.element.style = options.style ?? '';
        if (options.id) {
            this.element.setAttribute('id', options.id);
        }
        // Create an icon if there is one
        if (options.icon_name) {
            let the_icon = new Icon({icon_name: options.icon_name, classes: 'px-3'});
            this.sub_element = the_icon.element;
        }
    }

    appendTo(element: HTMLElement|Div) {
        let parent = (element instanceof Div) ? element.element : element;
        if (this.sub_element) {
            parent.appendChild(this.sub_element);
        }
        parent.appendChild(this.element);
        return this;
    }

    appendChild(element: HTMLElement) {
        this.element.appendChild(element);
    }
}

export class Select extends Div {
    element: HTMLSelectElement;
    constructor(options: SelectProps) {
        super(options);
        this.element = document.createElement('select');
        this.finaliseObject(options);
    }
}

export class Icon extends Div {
    constructor(options: IconProps) {
        super(options);
        this.element = document.createElement('i');
        this.finaliseObject(options);
    }
    finaliseObject(options: IconProps) {
        const {icon_name, ...new_options} = options;
        super.finaliseObject(new_options);
        this.element.className = `bi bi-${options.icon_name} ${options.classes}`;
    }
}

export class Input extends Div {
    element: HTMLInputElement;
    constructor(options: InputProps) {
        super(options);
        this.element = document.createElement('input');
        this.finaliseObject(options);
    }
    finaliseObject(options: InputProps) {
        super.finaliseObject(options);
        this.element.value = options.value;
    }
}

export class Heading extends Div {
    element: HTMLHeadingElement;
    constructor(options: HeadingProps) {
        super(options);
        this.element = document.createElement(`h${options.level}`) as HTMLHeadingElement;
        this.finaliseObject(options);
    }

    finaliseObject(options: HeadingProps) {
        super.finaliseObject(options);
        this.element.textContent = options.text_content;
    }
}

export class Option extends Div {
    element: HTMLOptionElement;
    constructor(options: OptionsProps) {
        super(options);
        this.element = document.createElement(`option`);
        this.finaliseObject(options);
    }

    finaliseObject(options: OptionsProps) {
        super.finaliseObject(options);
        this.element.textContent = options.text_content;
        if (options.value != undefined) {
            this.element.value = options.value;
        }
    }
}

export class Label extends Div {
    element: HTMLLabelElement;

    constructor(options: LabelProps) {
        super(options);
        this.element = document.createElement(`label`);
        this.finaliseObject(options);
    }

    finaliseObject(options: LabelProps) {
        super.finaliseObject(options);
        this.element.textContent = options.text_content;
        if (options.for_id != undefined) {
            this.element.setAttribute('for', options.for_id);
        }
    }

}


export class Button extends Div {
    element: HTMLButtonElement;

    constructor(options: ButtonProps) {
        super(options);
        this.element = document.createElement('button')
        this.finaliseObject(options);
    }

    finaliseObject(options: ButtonProps) {
        super.finaliseObject(options);
        this.element.textContent = options.text;
        this.element.type = options.button_type ?? 'submit';
        this.element.className = `btn btn-primary ${options.classes}`;
        this.element.setAttribute('href', '#');
        if (options.on_click) {
            this.element.addEventListener('click', options.on_click);
        }
    }
}

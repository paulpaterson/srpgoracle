/*
Some standard components

 */

interface ElementProps {
    classes?: string;
    style?: string;
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



export class Div {
    element: HTMLElement;

    constructor(options: ElementProps) {
        this.element = document.createElement('div');
        this.finaliseObject(options);
    }

    finaliseObject({classes='', style=''}: ElementProps) {
        this.element.className = classes;
        this.element.style = style;
    }

    appendTo(element: HTMLElement|Div) {
        if (element instanceof Div) {
            element.element.appendChild(this.element);
        } else {
            element.appendChild(this.element);
        }
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
        this.finaliseObject(options);
    }
    finaliseObject({classes = '', style = '', icon_name = ''}: IconProps) {
        super.finaliseObject({classes: '', style: ''});
        this.element = document.createElement('i');
        this.element.className = `bi bi-${icon_name} ${classes}`;
    }
}

export class Heading extends Div {
    element: HTMLHeadingElement;
    constructor(options: HeadingProps) {
        super(options);
        this.element = document.createElement(`h${options.level}`) as HTMLHeadingElement;
        this.finaliseObject(options);
    }

    finaliseObject({classes = '', style = '', text_content= ''}: HeadingProps) {
        super.finaliseObject({classes: classes, style: style});
        this.element.textContent = text_content;
    }
}

export class Option extends Div {
    element: HTMLOptionElement;
    constructor(options: OptionsProps) {
        super(options);
        this.element = document.createElement(`option`);
        this.finaliseObject(options);
    }

    finaliseObject({classes = '', style = '', text_content= '', value=''}: OptionsProps) {
        super.finaliseObject({classes: classes, style: style});
        this.element.textContent = text_content;
        if (value != '') {
            this.element.value = value;
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

    finaliseObject({classes = '', style = '', text_content= '', for_id=''}: LabelProps) {
        super.finaliseObject({classes: classes, style: style});
        this.element.textContent = text_content;
        this.element.setAttribute('for', for_id);
    }

}


export class Button extends Div {
    element: HTMLButtonElement;

    constructor(options: ButtonProps) {
        super(options);
        this.element = document.createElement('button')
        this.finaliseObject(options);
    }

    finaliseObject({classes = '', style = '', text = '', button_type = 'submit', on_click = undefined}: ButtonProps) {
        super.finaliseObject({classes: '', style: ''});
        this.element.textContent = text;
        this.element.type = button_type;
        this.element.className = `btn btn-primary ${classes}`;
        if (on_click) {
            this.element.addEventListener('click', on_click);
        }
    }
}

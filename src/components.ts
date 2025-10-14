/*
Some standard components

 */

interface ElementProps {
    classes?: string;
}

interface ButtonProps extends ElementProps{
    text: string;
    button_type?: "submit" | "button" | "reset",
    on_click?: (event: MouseEvent) => void;
}

export class Div {
    element: HTMLElement;

    constructor({classes=''}: ElementProps) {
        this.element = document.createElement('div');
        this.element.className = classes;
    }

    appendTo(element: HTMLElement|Div): this {
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


export class Button extends Div {
    element: HTMLButtonElement;

    constructor({text, button_type='submit', classes='', on_click=undefined}: ButtonProps) {
        super({classes: classes});
        this.element = document.createElement('button')
        this.element.textContent = text;
        this.element.type = button_type;
        this.element.className = `btn btn-primary ${classes}`;
        if (on_click) {
            this.element.addEventListener('click', on_click);
        }
    }
}

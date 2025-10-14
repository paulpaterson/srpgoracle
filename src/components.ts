/*
Some standard components

 */

interface ButtonProps {
    text: string;
    button_type?: "submit" | "button" | "reset",
    classes?: string;
    on_click?: (event: MouseEvent) => void;
}

export function Button({text, button_type='submit', classes='', on_click=undefined}: ButtonProps) {
    let button = document.createElement('button')
    button.textContent = text;
    button.type = button_type;
    button.className = `btn btn-primary ${classes}`;
    if (on_click) {
        button.addEventListener('click', on_click);
    }
    return button;
}
console.log('RUNNING');

const screen = document.getElementById('display');
const keys = document.querySelectorAll('.key');
keys.forEach((key) => { key.addEventListener('click', keyPressed) });
let result = 0;
let prevOperation = '=';
let displayString = '';
display();
function keyPressed(e) {
    const whichKey = this.innerText
    console.log(whichKey);
    if (displayString === '' && result === 0) {
        if (['/', '+', 'X', '='].includes(whichKey)) {
            screen.innerText = 'NOT VALID';
        } else {
            displayString = displayString.concat(whichKey);
            if (whichKey === '0') displayString = displayString.concat('.');
            display();
        }
    } else {
        if (['/', '-', '+', 'X', '='].includes(whichKey)) {
            operation = whichKey;
            calculate(operation);
        } else {
            if (displayString.length < 12) {
                displayString = displayString.concat(whichKey);
            }
            if (displayString === '-0') displayString = displayString.concat('.');
            display();
        }
    }
}

function calculate(operation) {
    const operand = Number(displayString);
    if (prevOperation === '+') {
        result += operand;
        prevOperation = operation;
    }
    if (prevOperation === '-') {
        result -= operand;
        prevOperation = operation;
    }
    if (prevOperation === 'X') {
        result *= operand;
        prevOperation = operation;
    }
    if (prevOperation === '/') {
        result /= operand;
        prevOperation = operation;
    }
    if (prevOperation === '=' && operation != '=') {
        result += operand;
        prevOperation = operation;
    }
    displayString = '';
    display()
    if (operation === '=') {
        screen.innerText = String(result).slice(0, 12);
    }
}

function display() {
    if (displayString === '') {
        screen.innerText = '0';
    } else {
        screen.innerText = displayString;
    }
}

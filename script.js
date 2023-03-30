console.log('RUNNING');
const minimal = document.querySelector('input');
minimal.addEventListener('change', switchDesign);

const screen = document.querySelector('#display');
screen.addEventListener('click', () => {
    result = 0;
    prevOperation = '=';
    displayString = '';
    display();
})
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
            if (displayString.length < 11) {
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
        screen.innerText = String(result).slice(0, 11);
    }
}

function display() {
    if (displayString === '') {
        screen.innerText = '0';
    } else {
        screen.innerText = displayString;
    }
}

function switchDesign(e){
    const draw = document.getElementById('base');
    console.log('CHANGE', this.checked, draw);
    console.dir(draw);
    if (this.checked) {
        draw.style.backgroundImage = 'none';
        document.documentElement.style.setProperty('--visible', 'rgb(5, 5, 5)');
    } else {
         draw.style.backgroundImage = '';
        document.documentElement.style.setProperty('--visible', 'rgba(5, 5, 5, 0.01)');
    }
}

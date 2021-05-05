let a = null;
let b = null;
let op = null;
let newop = null;
let result;

function add(x,y) {
    return x+y
}

function subtract(x,y) {
    return x-y
}

function multiply(x,y) {
    return x*y
}

function divide(x,y) {
    return x/y
}

function operate(operator, x, y) {
    switch(operator) {
        case "+":
            return add(x,y)
        case "−":
            return subtract(x,y)
        case "×":
            return multiply(x,y)
        case "÷":
            return divide(x,y)
        default:
            return "3RR0R"
    }
}

function reset() {
    a = result
    b = null
    op = null
    newop = null
    result = null
}

function populate(result) {
    const display = document.getElementById('display');
    display.innerHTML = result
}

const buttons = document.getElementById('buttons');

buttons.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains('btn');
    console.dir(event)
    if (!isButton) {
        return;
    }
    if (event.target.classList.contains('operator')) {
        if (a === null) {populate('3RR0R')}
        o = `${event.target.innerHTML}`
        if (b !== null) {
            result = operate(o,a,b)
            populate(result)
        }
    } else if (event.target.classList.contains('bigBtn')) {
        console.log(event.target.innerHTML)
        if (event.target.innerHTML === 'CLEAR') { 
            b = null
            op = null
            newop = null
            result = 0
            populate(result)
            a = null
        }
    } else {
        if (a === null) {
            a = event.target.innerHTML;
            populate(a)
        } else if (op === null) {
            a += event.target.innerHTML;
            populate(a)
        } else if (b === null) {
            b = event.target.innerHTML;
            populate(`${a} ${op} ${b}`)
        } else {
            b += event.target.innerHTML;
            populate(`${a} ${op} ${b}`)
        }
    }
})
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
    if (y === 0) { return "EXTERMINATE!"}
    let z = x/y
    if (z % 1 === 0) { return z}
    return parseFloat(z.toFixed(6))
}

function operate(operator, x, y) {
    x = Number(x)
    y = Number(y)
    switch(operator) {
        case "+":
            return add(x,y)
        case "−":
        case "-":
            return subtract(x,y)
        case "×":
        case "*":
            return multiply(x,y)
        case "÷":
        case "/":
            return divide(x,y)
        default:
            return "3RR0R"
    }
}

function reset() {
    a = result
    b = null
    op = newop
    newop = null
    result = null
}

function clear() {
    b = null
    op = null
    newop = null
    result = 0
    populate(result)
    a = null
    periodButton.disabled = false;
}

function setDigits(old, newNum) {
    if (old === null) { return newNum}
    return old + newNum
}

function setOp(key) {
    if (op === null) {
        op = key
        populate(`${a} ${op}`)
    } else {
        newop = key
        result = operate(op,a,b)
        reset()
        populate(`${a} ${op}`)
    }
}

function populate(x) {
    const display = document.getElementById('display');
    x = String(x)
    if (x === "") {
        display.innerHTML = '0'
        return
    } else if (x === "0") {
        display.innerHTML = '0'
        return
    }
    result = x.split(' ');
    for (let i = result.length - 1; i > 0; i--) {
        if (result[i] === "null") {result.pop()}
    } 

        display.innerHTML = result.join(' ')
}

function del() {
    let x = document.getElementById('display').innerHTML.split(" ")
    if (x[x.length - 1] > 1) {
        if (x[x.length-1].slice(-1) === ".") { periodButton.disabled = false;}
        x[x.length - 1] = x[x.length - 1].slice(0,-1)
        populate(x.join(' '))
        a = x[0] || null
        op = x[1] || null
        b = x[2] || null
    } else {
        x.pop()
        a = x[0] || null
        op = x[1] || null
        b = x[2] || null
        if (a == null) {
            populate('0')
        } else {
            populate(x.join(' '))
        }
    }
}

const buttons = document.getElementById('buttons');
const periodButton = document.getElementById('period');

buttons.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains('btn');
    if (!isButton) {
        return; // If not a button, end function.
    }
    if (event.target.innerHTML === '.') {
        periodButton.disabled = true;
    }
    if (event.target.classList.contains('operator')) {
        periodButton.disabled = false;
        if (a === null) {populate('3RR0R')}
        if (event.target.innerHTML === '=' && b !== null) {
            result = operate(op,a,b)
            populate(result)
            reset()
            return
        } else if (event.target.innerHTML === '=' && b === null) {
            populate('3RR0R')
            reset()
            a = null
            return
        }
        setOp(`${event.target.innerHTML}`);
        if (b !== null) {
            result = operate(op,Number(a),Number(b))
            populate(result)
            reset()
        }
    } else if (event.target.classList.contains('bigBtn')) {
        if (event.target.innerHTML === 'CLEAR') { 
            clear()
        }
        if (event.target.innerHTML === 'DELETE') {
            del()
        }
    } else {
        if (op === null || op === undefined) {
            a = setDigits(a,event.target.innerHTML);
            populate(a)
            return
        } else {
            b = setDigits(b,event.target.innerHTML);
            populate(`${a} ${op} ${b}`);
            return
        }
    }
})

window.addEventListener('keydown', function(e) {
    switch(e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            if (op === null) {
                a = setDigits(a,e.key)
            } else {
                b = setDigits(b,e.key)
            }
            populate(`${a} ${op} ${b}`)
            break;
        case '/':
        case '*':
        case 'x':
        case '+':
        case '-':
            setOp(e.key)
            if (newop !== null) {
                reset()
            }
            break
        case '=':
        case 'Enter':
            result = operate(op,a,b)
            populate(result)
            reset()
            return
        case 'Backspace':
            del()
            return
        case 'c':
            clear()
            return
        default:
            return
    }   
})
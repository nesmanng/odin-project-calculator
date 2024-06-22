const displayOutput = document.querySelector('.display-output');
const displayInput = document.querySelector('.display-input');
const numberButtons = document.querySelectorAll('.number');
const operandButtons = document.querySelectorAll('.operand');
const allClearButton = document.querySelector('.all-clear-button');
const deleteButton = document.querySelector('.delete-button');
const divideByHundredButton = document.querySelector('.divide-by-hundred-button');
const equalsButton = document.querySelector('.equals-button');
const decimalButton = document.querySelector('.decimal-button');

let firstNumber = null;
let secondNumber = null;
let selectedOperand = null;
let previousOperand = null;
let equalsButtonClicked = false;
const maxDigits = 9;
let displayValue = '0';
displayOutput.textContent = displayValue;

function handleButtonMouseDown(e) {
    const clickedButton = e.target;
    clickedButton.classList.add('active');
}

function handleButtonMouseUp(e) {
    const clickedButton = e.target;
    clickedButton.classList.remove('active');
}

numberButtons.forEach(button => {
    button.addEventListener('mousedown', handleButtonMouseDown);
    button.addEventListener('mouseup', handleButtonMouseUp);
    button.addEventListener('click', onClickNumberButton);
});

// Event listeners for operand buttons
operandButtons.forEach(button => {
    button.addEventListener('mousedown', handleButtonMouseDown);
    button.addEventListener('mouseup', handleButtonMouseUp);
    button.addEventListener('click', onClickOperandButton);
});

// Event listener for all clear button
allClearButton.addEventListener('mousedown', handleButtonMouseDown);
allClearButton.addEventListener('mouseup', handleButtonMouseUp);
allClearButton.addEventListener('click', onClickAllClearButton);

// Event listener for delete button
deleteButton.addEventListener('mousedown', handleButtonMouseDown);
deleteButton.addEventListener('mouseup', handleButtonMouseUp);
deleteButton.addEventListener('click', onClickDeleteButton);

// Event listener for % button
divideByHundredButton.addEventListener('mousedown', handleButtonMouseDown);
divideByHundredButton.addEventListener('mouseup', handleButtonMouseUp);
divideByHundredButton.addEventListener('click', onClickDivideByHundredButton);

// Event listener for equals button
equalsButton.addEventListener('mousedown', handleButtonMouseDown);
equalsButton.addEventListener('mouseup', handleButtonMouseUp);
equalsButton.addEventListener('click', onClickEqualsButton);

// Event listener for decimal button
decimalButton.addEventListener('mousedown', handleButtonMouseDown);
decimalButton.addEventListener('mouseup', handleButtonMouseUp);
decimalButton.addEventListener('click', onClickDecimalButton);

document.addEventListener('keydown', handleKeyDown);

function calculate(operand, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = '';
    
    switch (operand) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '÷':
            if (num2 === 0) {
                return "Error";
            }
            result = num1 / num2;
            break;
        default:
            break;
    }
    
    // Convert the result to a string and limit it to maxDigits
    result = result.toString();
    if (result.includes('.')) {
        // If the result contains a decimal point, limit the total number of digits
        if (result.length > maxDigits) {
            result = result.slice(0, maxDigits);
        }
    } else {
        // If the result is an integer, limit the number of digits before the decimal point
        if (result.length > maxDigits - 1) {
            result = result.slice(0, maxDigits - 1);
        }
    }
    
    return result;
}

function onClickNumberButton(e) {
    if (equalsButtonClicked === true) {
        onClickAllClearButton();
        equalsButtonClicked = false;
    }
    if (selectedOperand === null) {
        if (displayValue.length < maxDigits) {
            if (displayValue === '0') {
                displayValue = e.target.textContent;
                firstNumber = displayValue;
            } 
            
            else {
                displayValue += e.target.textContent;
                firstNumber = displayValue;
            }
            
            displayOutput.textContent = displayValue;
        }
    } 
    
    else {
        if (secondNumber === null) {
            displayValue = e.target.textContent;
            secondNumber = displayValue;
        } 
        
        else {
            displayValue += e.target.textContent;
            secondNumber = displayValue;
        }
        displayOutput.textContent = displayValue;
    }
}

function onClickOperandButton(e) {
    if (equalsButtonClicked === true) {
        firstNumber = null;
        secondNumber = null;
        selectedOperand = null;
        previousOperand = null;
        displayOutput.textContent = displayValue;
        displayInput.textContent = '';
        equalsButtonClicked = false;
    }

    if (selectedOperand === null) {
        selectedOperand = e.target.textContent;
        firstNumber = displayValue;
        displayOutput.textContent = displayValue 
        displayInput.textContent = displayValue + ' ' + selectedOperand;
        previousOperand = selectedOperand;
    }

    else {
        selectedOperand = e.target.textContent;
        if (firstNumber !== null && secondNumber !== null) {
            let result = calculate(previousOperand, firstNumber, secondNumber);
            firstNumber = result;
            displayValue = result;
            secondNumber = null;
            previousOperand = selectedOperand;
        }

        else {
            displayOutput.textContent = displayValue;
            previousOperand = selectedOperand;
        }
        displayInput.textContent = displayValue + ' ' + selectedOperand;
    }
}

function onClickAllClearButton() {
    firstNumber = null;
    secondNumber = null;
    selectedOperand = null;
    previousOperand = null;
    displayValue = '0';
    displayOutput.textContent = displayValue;
    displayInput.textContent = '';
}

function onClickDeleteButton() {
    if (displayValue.length > 1) { 
      displayValue = displayValue.slice(0, -1); 
      firstNumber = displayValue; 
    } 
    
    else {
        displayValue = '0';
        firstNumber = null;
    }

    displayOutput.textContent = displayValue;
  }

function onClickEqualsButton (){
    equalsButtonClicked = true;
    // If no operand selected, display current number 
    if (firstNumber !== null && secondNumber !== null) {
        let result = calculate(previousOperand, firstNumber, secondNumber);
        secondNumber = result;
        displayValue = result;
    }

    else if (firstNumber !== null && secondNumber === null) {
        displayValue = firstNumber;
    }

    else if (firstNumber === null && secondNumber === null) {
        displayValue = '0';
    }

    else {
        secondNumber = firstNumber;
        let result = calculate(previousOperand, firstNumber, secondNumber);
        firstNumber = result;
        displayValue = result;
        secondNumber = null;
    }

    displayOutput.textContent = displayValue;
    displayInput.textContent = '';
    console.log(displayOutput.textContent);
}

function onClickDecimalButton() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        firstNumberNumber = displayValue;
    }

    else {
        displayValue = displayValue;
    }

    displayOutput.textContent = displayValue;
}

function onClickDivideByHundredButton() {
    displayValue = parseFloat(displayValue) / 100;
    displayOutput.textContent = displayValue;
}

function handleKeyDown(e) {
    const key = e.key;

    // Map the pressed key to the corresponding button
    const buttonMap = {
        '0': 'button[data-value="0"]',
        '1': 'button[data-value="1"]',
        '2': 'button[data-value="2"]',
        '3': 'button[data-value="3"]',
        '4': 'button[data-value="4"]',
        '5': 'button[data-value="5"]',
        '6': 'button[data-value="6"]',
        '7': 'button[data-value="7"]',
        '8': 'button[data-value="8"]',
        '9': 'button[data-value="9"]',
        '+': 'button[data-value="+"]',
        '-': 'button[data-value="-"]',
        '*': 'button[data-value="x"]',
        '/': 'button[data-value="÷"]',
        '%': 'button.divide-by-hundred-button',
        '.': 'button.decimal-button',
        '=': 'button.equals-button',
        'Backspace': 'button.delete-button',
        'Escape': 'button.all-clear-button'
    };

    const buttonSelector = buttonMap[key];

    if (buttonSelector) {
        const button = document.querySelector(buttonSelector);
        if (button) {
            button.click();
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 100);
        }
    }
}
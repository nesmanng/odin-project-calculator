const displayOutput = document.querySelector('.display-output');
const displayInput = document.querySelector('.display-input');
const numberButtons = document.querySelectorAll('.number');
const operandButtons = document.querySelectorAll('.operand');
const allClearButton = document.querySelector('.all-clear-button');
const deleteButton = document.querySelector('.delete-button');
const equalsButton = document.querySelector('.equals-button');
const decimalButton = document.querySelector('.decimal-button');

let firstNumber = null;
let secondNumber = null;
let selectedOperand = null;
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

// Event listener for equals button
equalsButton.addEventListener('mousedown', handleButtonMouseDown);
equalsButton.addEventListener('mouseup', handleButtonMouseUp);
equalsButton.addEventListener('click', onClickEqualsButton);

// Event listener for decimal button
decimalButton.addEventListener('mousedown', handleButtonMouseDown);
decimalButton.addEventListener('mouseup', handleButtonMouseUp);
decimalButton.addEventListener('click', onClickDecimalButton);


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
            result = num1 / num2;
            break;
        default:
            break;
    }
    return result;
}

function onClickNumberButton(e) {
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
        displayValue = e.target.textContent;
        selectedOperand = null;
        secondNumber = displayValue;
        displayOutput.textContent = displayValue;
    }
}

function onClickOperandButton(e) {
    if (firstNumber !== null && secondNumber !== null) {
        onClickEqualsButton();
    }

    else {
        displayOutput.textContent = displayValue;
    }

    selectedOperand = e.target.textContent;
    displayInput.textContent = displayValue + ' ' + selectedOperand;
}

function onClickAllClearButton() {
    firstNumber = null;
    secondNumber = null;
    selectedOperand = null;
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
    // If no operand selected, display current number 
    if (firstNumber !== null && secondNumber !== null) {
        let result = calculate(selectedOperand, firstNumber, secondNumber);
        firstNumber = result;
        displayValue = result;
        secondNumber = null;
        displayOutput.textContent = displayValue;
    }

    else if (firstNumber == null && secondNumber == null) {
        displayValue = '0';
        displayOutput.textContent = displayValue;
    }

    else {
        secondNumber = firstNumber;
        let result = calculate(selectedOperand, firstNumber, secondNumber);
        firstNumber = result;
        displayValue = result;
        secondNumber = null;
        displayOutput.textContent = displayValue;
    }
}

function onClickDecimalButton() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        currentNumber = displayValue;
    }

    else {
        displayValue = displayValue;
    }

    displayOutput.textContent = displayValue;
}


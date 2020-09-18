const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=' : (secondNumber) => secondNumber
}

let firstValue = 0;
let operatorValue = '';
let awaitingValue = false;

function sendNumberValue(number) {
    if(awaitingValue){
        calculatorDisplay.textContent = number;
        awaitingValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }

}

function addDecimal() {
    if(awaitingValue){
        return;
    }

    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    };
}

function clearDisplay() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingValue = false;
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && awaitingValue) {
        operatorValue = operator;
        return;
    };
    if(!firstValue){
        firstValue = currentValue;
    } else{
        const calculation  = calculate[operatorValue](firstValue, currentValue);
        firstValue = calculation;
        calculatorDisplay.textContent = calculation;
    }
    awaitingValue = true;
    operatorValue = operator;
}

inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

clearBtn.addEventListener('click', clearDisplay)
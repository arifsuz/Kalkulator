let displayElement = document.getElementById('display');
let historyList = document.getElementById('historyList');
let currentNumber = '';
let previousNumber = '';
let operation = null;

function appendNumber(number) {
    playSound();
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    updateDisplay();
}

function updateDisplay() {
    displayElement.innerText = currentNumber || '0';
}

function clearDisplay() {
    playSound();
    currentNumber = '';
    updateDisplay();
}

function clearAll() {
    playSound();
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateDisplay();
    clearHistory();
}

function deleteLastDigit() {
    playSound();
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
}

function setOperation(op) {
    playSound();
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculateResult();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

function calculateResult() {
    playSound();
    if (currentNumber === '' || previousNumber === '') return;
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    addHistory(`${previousNumber} ${operation} ${currentNumber} = ${result}`);
    currentNumber = result;
    operation = null;
    previousNumber = '';
    updateDisplay();
}

function addHistory(entry) {
    const historyItem = document.createElement('li');
    historyItem.textContent = entry;
    historyList.appendChild(historyItem);
    historyList.scrollTop = historyList.scrollHeight;
}

function clearHistory() {
    historyList.innerHTML = '';
}

function playSound() {
    const audio = new Audio('https://www.soundjay.com/button/button-1.mp3');
    audio.play();
}
function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = '';
}

function deleteLast() {
    let currentDisplay = document.getElementById('display').value;
    document.getElementById('display').value = currentDisplay.slice(0, -1);
}

function calculateResult() {
    let display = document.getElementById('display').value;

    try {
        display = preprocessExponential(display);
        const result = eval(display);
        document.getElementById('display').value = result;
        saveHistory(display + " = " + result);
    } catch (error) {
        console.error("Calculation error:", error);
        document.getElementById('display').value = 'Error';
    }
}

function preprocessExponential(input) {
    return input.replace(/e\^(\d+)/g, function(_, x) {
        return Math.exp(parseFloat(x));
    });
}

function saveHistory(entry) {
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.textContent = entry;
    historyList.appendChild(historyItem);
}

function toggleHistory() {
    const historyModal = document.getElementById('historyModal');
    historyModal.classList.toggle('show');
}

function clearHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    toggleHistory();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === '.') {
        appendToDisplay(key);
    }
});

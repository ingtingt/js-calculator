let calculation = '';
let isCleared = true;

function dis(val) {
  if (isCleared) {
    isCleared = false;
    document.querySelector('.js-button-clear').textContent = 'C';
  }
  const displayVal = val === '*' ? '×' : val === '/' ? '÷' : val;
  document.querySelector('.display').textContent += displayVal;
  calculation += val;
}

function toggleSign() {
  const display = document.querySelector('.display');
  const currentText = display.textContent;
  const lastNumberMatch = currentText.match(/-?\d+\.?\d*$/);
  if (lastNumberMatch) {
    const lastNumber = lastNumberMatch[0];
    const toggledNumber = lastNumber.startsWith('-')
      ? lastNumber.substring(1)
      : `-${lastNumber}`;

    // Replace the last number in the display with the toggled number
    const newText =
      currentText.slice(0, currentText.length - lastNumber.length) +
      toggledNumber;
    display.textContent = newText;

    // Replace the last number in the calculation string with the toggled number
    calculation =
      calculation.slice(0, calculation.length - lastNumber.length) +
      toggledNumber;
  }
}

function toPercent() {
  const display = document.querySelector('.display');
  const currentText = display.textContent;
  const lastNumberMatch = currentText.match(/-?\d+\.?\d*$/);
  if (lastNumberMatch) {
    const lastNumber = lastNumberMatch[0];
    const percentValue = parseFloat(lastNumber) * 0.01;

    // Replace the last number in the display with its percentage value
    const newText =
      currentText.slice(0, currentText.length - lastNumber.length) +
      percentValue;
    display.textContent = newText;

    // Replace the last number in the calculation string with the percentage value
    calculation =
      calculation.slice(0, calculation.length - lastNumber.length) +
      percentValue;
  }
}

function clearCalculation() {
  if (isCleared) {
    // AC mode: Clear everything
    calculation = '';
    document.querySelector('.display').textContent = '';
  } else {
    // C mode: Clear the current input
    document.querySelector('.display').textContent = '';
    calculation = '';
    isCleared = true;
    document.querySelector('.js-button-clear').textContent = 'AC';
  }
}

function evaluateCalculation() {
  try {
    // Prevent invalid calculations
    if (/[*+/.\-]$/.test(calculation)) {
      throw new Error('Invalid calculation');
    }

    const result = eval(calculation);
    document.querySelector('.display').textContent = result;
    calculation = result.toString();
    isCleared = true;
    document.querySelector('.js-button-clear').textContent = 'AC';
  } catch (error) {
    document.querySelector('.display').textContent = 'Error';
    calculation = '';
    isCleared = true;
    document.querySelector('.js-button-clear').textContent = 'AC';
  }
}

// Handle button presses in a loop
const buttons = document.querySelectorAll("[class^='js-button']");
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    let value = button.textContent.trim();

    // Convert display symbols to corresponding operators for calculation
    if (value === '×') {
      value = '*';
    } else if (value === '÷') {
      value = '/';
    }

    if (value === '=') {
      evaluateCalculation();
    } else if (value === '±') {
      toggleSign();
    } else if (value === '%') {
      toPercent();
    } else if (value === 'AC' || value === 'C') {
      clearCalculation();
    } else {
      dis(value);
    }
  });
});

let numbers = document.querySelectorAll('.number'),
    operators = document.querySelectorAll('.operator'),
    decimalButton = document.getElementById('decimal'),
    minusButton = document.getElementById('minus')
    radicButton = document.getElementById('radic'),
    absButton = document.getElementById('abs'),
    factorialButton = document.getElementById('factorial'),
    clearButtons = document.querySelectorAll('.clear-btn'),
    resultButton = document.getElementById('result'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = '0',
    MemoryNewNumber = false,
    MemoryPendingOperation = '';

numbers.forEach(number => {
  number.addEventListener('click', function(symbol){
    numberPress(symbol.target.textContent);
  });
})

operators.forEach(operator => {
  operator.addEventListener('click', function(symbol) {
    operatorPress(symbol.target.textContent);
  });
})

clearButtons.forEach(clearButton => {
  clearButton.addEventListener('click', function(id){
    clearPress(id.srcElement.id)
  });
})

decimalButton.addEventListener('click', decimalAdd);
radicButton.addEventListener('click', radicAdd);
absButton.addEventListener('click', absAdd);
factorialButton.addEventListener('click', factorialAdd);
minusButton.addEventListener('click', minusAdd);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  }
  else if (MemoryNewNumber && MemoryPendingOperation === '-') {
    display.value = -(number);
    MemoryNewNumber = false;
  } else {
    display.value === '0' ? display.value = number : display.value += number;
  }
};

function operatorPress(operation) {
  let localOperationMemory = display.value;
  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  }
  else {
    MemoryNewNumber = true;
    switch (MemoryPendingOperation) {
      case '+':
        MemoryCurrentNumber += parseFloat(localOperationMemory);
        MemoryCurrentNumber = MemoryCurrentNumber;
        MemoryPendingOperation = '';
        break;
      case '-':
        MemoryCurrentNumber -= parseFloat(localOperationMemory);
        MemoryCurrentNumber = MemoryCurrentNumber;
        MemoryPendingOperation = '';
        break;
      case '×':
        MemoryCurrentNumber *= parseFloat(localOperationMemory);
        MemoryCurrentNumber = MemoryCurrentNumber;
        MemoryPendingOperation = '';
        break;
      case '÷':
        MemoryCurrentNumber /= parseFloat(localOperationMemory);
        MemoryCurrentNumber = MemoryCurrentNumber;
        MemoryPendingOperation = '';
        break;
      case '^':
        MemoryCurrentNumber = parseFloat(Math.pow(MemoryCurrentNumber, localOperationMemory).toPrecision(12));
        if (MemoryCurrentNumber.toString().includes('.')) {
          if (MemoryCurrentNumber.toString().split('.').pop().includes('0000')) {
            MemoryCurrentNumber = MemoryCurrentNumber.toString().split('.').shift();
          }
        }
        MemoryPendingOperation = '';
        break;
      default:
        MemoryCurrentNumber = parseFloat(localOperationMemory);
        break;
    }
    display.value = parseFloat(MemoryCurrentNumber);
    MemoryPendingOperation = operation;
  }
};

function decimalAdd() {
  let localDecimalMemory = display.value;
  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  }
  else {
    if(localDecimalMemory.indexOf('.') === -1 ) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
};

function radicAdd() {
  let localOperationMemory = display.value;
  if (Math.sign(localOperationMemory) == '1') {
    localOperationMemory = Math.sqrt(localOperationMemory);
    setOperationSave(localOperationMemory);
  }
  else {display.value = 'Error'}
};

function absAdd(){
  let localOperationMemory = display.value;
  localOperationMemory = Math.abs(localOperationMemory);
  setOperationSave(localOperationMemory);
};

function factorialAdd(){
  let localOperationMemory = display.value;
    function factorialize(number) {
    let result = number;
    if (number === 0 || number === 1)
      return 1;
    while (number > 1) {
      number--;
      result *= number;
    }
    return result;
  }
  localOperationMemory = factorialize(localOperationMemory)
  setOperationSave(localOperationMemory);
};

function minusAdd() {
  let localOperationMemory = display.value;
  localOperationMemory = -(localOperationMemory);
  setOperationSave(localOperationMemory);
};

function clearPress(id) {
  switch (id) {
    case 'ce':
      display.value = '0';
      MemoryNewNumber = true;
      break;
    case 'clean':
      display.value = '0';
      MemoryNewNumber = true;
      MemoryCurrentNumber = 0;
      MemoryPendingOperation = '';
      break;
  }
};

function setOperationSave(localOperationMemory) {
  display.value = localOperationMemory;
  MemoryNewNumber = false;
  MemoryCurrentNumber = localOperationMemory;
  MemoryPendingOperation = '';
};

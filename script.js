let numbers = document.querySelectorAll('.number'),
    operators = document.querySelectorAll('.operator'),
    decimalButton = document.getElementById('decimal'),
    minusButton = document.getElementById('minus')
    radicButton = document.getElementById('radic'),
    sup2Button = document.getElementById('sup2'),
    absButton = document.getElementById('abs'),
    factorialButton = document.getElementById('factorial'),
    clearButtons = document.querySelectorAll('.clear-btn'),
    resultButton = document.getElementById('result'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = '0',
    MemoryNewNumber = false,
    MemoryPendingOperation = '';


for(i = 0; i < numbers.length; i++){
  let number = numbers[i];
  number.addEventListener('click', function(symbol){
    numberPress(symbol.target.textContent);
  });
}
for(i = 0; i < operators.length; i++){
  let operatorButton = operators[i];
  operatorButton.addEventListener('click', function(symbol) {
    operatorPress(symbol.target.textContent);
  });
}
for(i = 0; i < clearButtons.length; i++){
  let clearButton = clearButtons[i];
  clearButton.addEventListener('click', function(id){
    clearPress(id.srcElement.id)
  });
}
decimalButton.addEventListener('click', decimalAdd);
radicButton.addEventListener('click', radicAdd);
sup2Button.addEventListener('click', sup2Add);
absButton.addEventListener('click', absAdd);
factorialButton.addEventListener('click', factorialAdd);
minusButton.addEventListener('click', minusAdd);

function numberPress(number){
  if (MemoryNewNumber){
    display.value = number;
    MemoryNewNumber = false;
  }
  else if(MemoryNewNumber && MemoryPendingOperation === '-'){
    display.value = -(number);
    MemoryNewNumber = false;
  }
  else{
    if(display.value === '0'){
      display.value = number;
    }
    else{
    display.value += number;
    }
  }
};

function operatorPress(operation){
  let localOperationMemory = display.value;
  if (MemoryNewNumber && MemoryPendingOperation !== '='){
    display.value = MemoryCurrentNumber;
  }
  else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+'){
      MemoryCurrentNumber += parseFloat(localOperationMemory);
      MemoryCurrentNumber = MemoryCurrentNumber;
    }
    else if (MemoryPendingOperation === '-'){
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
      MemoryCurrentNumber = MemoryCurrentNumber;
    }
    else if (MemoryPendingOperation === '×'){
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
      MemoryCurrentNumber = MemoryCurrentNumber;
    }
    else if (MemoryPendingOperation === '÷'){
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
      MemoryCurrentNumber = MemoryCurrentNumber;
    }
    else{
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = operation;
  }
};

function decimalAdd(id){
  let localDecimalMemory = display.value;
  if (MemoryNewNumber){
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  }
  else{
    if(localDecimalMemory.indexOf('.') === -1 ){
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
};

function radicAdd(id){
  let localOperationMemory = display.value;
  if (Math.sign(localOperationMemory) == '1'){
    localOperationMemory = Math.sqrt(localOperationMemory);
    display.value = localOperationMemory;
    MemoryNewNumber = false;
    MemoryCurrentNumber = localOperationMemory;
    MemoryPendingOperation = '';
  }
  else {display.value = 'Error'}
};

function sup2Add(id){
  let localOperationMemory = display.value;
  localOperationMemory = Math.pow(localOperationMemory, 2);
  let numberOfSings = function (localOperationMemory){
  return (localOperationMemory.toString().includes('.')) ? (localOperationMemory.toString().split('.').pop().length) : (0);
  };
  if (numberOfSings(localOperationMemory) <= '20'){
    display.value = localOperationMemory;
    MemoryNewNumber = false;
    MemoryCurrentNumber = localOperationMemory;
    MemoryPendingOperation = '';
  }
  else{
    display.value = localOperationMemory.toFixed(20);
    MemoryNewNumber = false;
    MemoryCurrentNumber = localOperationMemory;
    MemoryPendingOperation = '';
    }
};

function absAdd(id){
  let localOperationMemory = display.value;
  localOperationMemory = Math.abs(localOperationMemory);
  display.value = localOperationMemory;
  MemoryNewNumber = false;
  MemoryCurrentNumber = localOperationMemory;
  MemoryPendingOperation = '';
};

function factorialAdd(id){
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
  display.value = localOperationMemory;
  MemoryNewNumber = false;
  MemoryCurrentNumber = localOperationMemory;
  MemoryPendingOperation = '';
};

function minusAdd(id){
  let localOperationMemory = display.value;
  localOperationMemory = -(localOperationMemory);
  display.value = localOperationMemory;
  MemoryNewNumber = false;
  MemoryCurrentNumber = localOperationMemory;
  MemoryPendingOperation = '';
};

function clearPress(id){
  if (id === 'ce'){
    display.value = '0';
    MemoryNewNumber = true;
  }
  else if (id === 'clean') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
};

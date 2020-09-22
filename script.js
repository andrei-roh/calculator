let numbers = document.querySelectorAll('.number'),
    operators = document.querySelectorAll('.operator'),
    decimalButton = document.getElementById('decimal'),
    clearButtons = document.querySelectorAll('.clear-btn')
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


function numberPress(number){
  if (MemoryNewNumber){
    display.value = number;
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
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    }
    else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    }
    else if (MemoryPendingOperation === '×') {
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
    }
    else if (MemoryPendingOperation === '÷') {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    }
    else {
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

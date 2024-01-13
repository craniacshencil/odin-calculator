let currentArgument = document.querySelector(".current-arguments");
let history = document.querySelector(".history");

//Add eventListeners to all buttons
//Numbers
const numberButtons= Array.from(document.querySelectorAll(".number"));
numberButtons.forEach(button => button.addEventListener("click", getNumber)); 

function getNumber(){
    if(currentArgument.textContent.includes("Invalid"))
        return ;
    currentArgument.textContent += this.value;
}

//Clear operation
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", performClearScreen);

function performClearScreen(){
    currentArgument.textContent = "";
    history.textContent = "";
}

//equals operation
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", performEquals);

function performEquals(){
//to bring expression in format: "op1 operator op2" i.e (uniform spacing)
    const expression = `${history.textContent}${currentArgument.textContent}`;
//returns nothing if history contains "=" and when the expression is in the form "21 + " or the screen is empty
    if((history.textContent.includes("=")) || (currentArgument.textContent == "") || (currentArgument.textContent.includes("Invalid")) )
        return ;
    
    else{
        history.textContent += `${currentArgument.textContent} ${this.textContent}`; 
        currentArgument.textContent = operate(expression);
    }
}

//arithmetic operations
const operationButtons = Array.from(document.querySelectorAll(".operation"));
let previousOperation = "";
operationButtons.map(button => button.addEventListener("click", performOperation));

function performOperation(){
    historyText = history.textContent
    historyHasOperatorAlready = historyText.includes("x") || historyText.includes("/") || historyText.includes("+") || historyText.includes("-");
    if((history.textContent == "" && currentArgument.textContent == "")|| currentArgument.textContent.includes("Invalid"))    
        return ;
    else if(history.textContent.includes("=")){
        history.textContent = `${currentArgument.textContent} ${this.textContent} `;
        currentArgument.textContent = "";
    }
    else if(historyHasOperatorAlready && currentArgument.textContent == ""){
        operationIndex = history.textContent.indexOf(previousOperation);
        history.textContent = history.textContent.slice(0, operationIndex) + this.textContent + " ";
    }
    else if(historyHasOperatorAlready && currentArgument.textContent != ""){
        const expression = `${history.textContent}${currentArgument.textContent}`;
        history.textContent = `${operate(expression)} ${this.textContent} `;
        currentArgument.textContent = "";
    }

    else{
    history.textContent += `${currentArgument.textContent} ${this.textContent} `; 
    currentArgument.textContent = "";
    }
    previousOperation = this.textContent;
}

//operate function
function operate(expression){
    [operand1, operator, operand2] = expression.split(" ");
    operand1 = +operand1;
    operand2 = +operand2;
    switch(operator){
        case '+': return operand1 + operand2;
        case '-': return operand1 - operand2;
        case 'x': return operand1 * operand2;
        case '/': return (operand2 == 0)? "Invalid expression. Press C" : operand1 / operand2;
    }
}


let currentArgument = document.querySelector(".current-arguments");
let history = document.querySelector(".history");

//Add eventListeners to all buttons
//Numbers
const numberButtons= Array.from(document.querySelectorAll(".number"));
numberButtons.forEach(button => button.addEventListener("click", getNumber)); 

function getNumber(){
    currentArgTC = currentArgument.textContent;
    historyTC = history.textContent;
    if(currentArgTC.includes("Invalid") || historyTC.includes("="))
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
    let currentArgTC = currentArgument.textContent;
    let historyTC = history.textContent;
//to bring expression in format: "op1 operator op2" i.e (uniform spacing)
    const expression = `${historyTC}${currentArgTC}`;
//returns nothing if history contains "=" and when the expression is in the form "21 + " or the screen is empty
    if((historyTC.includes("=")) || (currentArgTC == "") || (currentArgTC.includes("Invalid")))
        return ;
    
    else{
        history.textContent += `${currentArgTC} ${this.textContent}`; 
        currentArgument.textContent = operate(expression);
    }
}

//arithmetic operations
const operationButtons = Array.from(document.querySelectorAll(".operation"));
let previousOperation = "";
operationButtons.map(button => button.addEventListener("click", performOperation));

function performOperation(){
    let currentArgTC = currentArgument.textContent;
    let historyTC = history.textContent;
    historyHasOperatorAlready = historyTC.includes("x") || historyTC.includes("/") || historyTC.includes("+") || historyTC.includes("-");
    if((historyTC == "" && currentArgTC == "")|| currentArgTC.includes("Invalid"))    
        return ;
    else if(historyTC.includes("=")){
        history.textContent = `${currentArgTC} ${this.textContent} `;
        currentArgument.textContent = "";
    }
    else if(historyHasOperatorAlready && currentArgTC == ""){
        operationIndex = historyTC.indexOf(previousOperation);
        history.textContent = historyTC.slice(0, operationIndex) + this.textContent + " ";
    }
    else if(historyHasOperatorAlready && currentArgTC != ""){
        const expression = `${historyTC}${currentArgTC}`;
        const evaluation = operate(expression);
        console.log(typeof evaluation);
        if(evaluation == "Invalid expression. Press C"){
            history.textContent = "";
            currentArgument.textContent = "Invalid expression. Press C";
        }
        else{
            history.textContent = `${evaluation} ${this.textContent} `;
            currentArgument.textContent = evaluation; 
        }
    }

    else{
    history.textContent += `${currentArgTC} ${this.textContent} `; 
    currentArgument.textContent = "";
    }
    previousOperation = this.textContent;
}

//decimal point functionality
const decimalPointButton = document.querySelector(".point");
decimalPointButton.addEventListener("click", getDecimalPoint);

function getDecimalPoint(){
    let currentArgTC = currentArgument.textContent;
    let historyTC = history.textContent;
    if(currentArgTC.includes("Invalid") || historyTC.includes("=") || (currentArgTC.includes(".")))
        return ;
    currentArgument.textContent += this.textContent;
}

//delete character functionality
const deleteCharButton = document.querySelector(".delete");
deleteCharButton.addEventListener("click", performDeleteCharacter);

function performDeleteCharacter(){
    let currentArgTC = currentArgument.textContent;
    let historyTC = history.textContent;
    if(currentArgTC == "" || historyTC.includes("=") || currentArgTC.includes("Invalid"))
        return ;
    else{
        currentArgument.textContent = currentArgTC.slice(0, -1);
    }
}
//operate function
function operate(expression){
    let result;
    [operand1, operator, operand2] = expression.split(" ");
    operand1 = +operand1;
    operand2 = +operand2;
    switch(operator){
        case '+': result = operand1 + operand2;break;
        case '-': result = operand1 - operand2;break;
        case 'x': result = operand1 * operand2;break;
        case '/': result = (operand2 == 0)? "Invalid expression. Press C" : operand1 / operand2;break;
    }
//Rounding float to 3 digits and keeping integers unchanged
    if(Math.round(result) == result || result.toString().includes("Invalid"))
        return result;
    else if(Math.round(result) != result)
        return result.toFixed(3);
}


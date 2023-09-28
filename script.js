const previewDisplay = document.querySelector("#historico");
const resultDisplay = document.querySelector("#resultado");
const teclas = document.querySelectorAll('td');

class Calculator {
  constructor(previewDisplay, resultDisplay) {
    this.previewDisplay = previewDisplay;
    this.resultDisplay = resultDisplay;
    this.currentOperation = '';
    this.posOperation = '';
    this.lastNumber = 0;
    this.firstNumber = 0;
    this.result = 0;
    this.operator = '';
    this.operatorFunctions = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };
  }

  updateScreen() {
    this.resultDisplay.textContent = this.currentOperation;
  }

  updateScreenPreview() {
    this.previewDisplay.textContent = this.posOperation;
  }

  performOperation(operator) {
    this.posOperation += this.currentOperation + " " + operator+" ";
    this.firstNumber = Number(this.currentOperation);
    console.log(this.firstNumber);
    this.currentOperation = '';
    this.operator = operator;
    this.updateScreenPreview();
  }

  calculateResult() {
    this.posOperation += this.currentOperation;
    this.updateScreenPreview();
    this.lastNumber = Number(this.currentOperation);
    console.log(this.lastNumber);
    this.result = this.operatorFunctions[this.operator](this.firstNumber, this.lastNumber);
    this.currentOperation = this.result.toString();
    }

  addDigit(digit) {
    if (digit === "." && this.resultDisplay.textContent.includes(".")) {
      return;
    }
    if (digit === "AC" || digit === "Back") {
      switch (digit) {
        case "AC":
          this.currentOperation = "";
          this.posOperation = "";
          break;
        case "Back":
          this.currentOperation = this.currentOperation.substring(0, this.currentOperation.length - 1);
          break;
      }
    } else if (digit === '+' || digit === '-' || digit === '*' || digit === '/') {
      this.performOperation(digit);
    } else if (digit === '=') {
      this.calculateResult();
    } else {
      this.currentOperation += digit;
    }

    this.updateScreen();
    this.updateScreenPreview();
  }
}

const calculator = new Calculator(previewDisplay, resultDisplay);

teclas.forEach((bts) => {
  bts.addEventListener("click", (e) => {
    const valor = e.target.textContent;
    calculator.addDigit(valor);
  });
});

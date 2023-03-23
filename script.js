class Calculator{
    constructor (previousText, currentText){
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }
    
    clear(){
        this.currentOp = ''
        this.previousOp = ''
        this.operation = undefined

    }

    delete(){
        this.currentOp = this.currentOp.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + number.toString()

    }

    chooseOperation(operation){
        if (this.currentOp === '') return
        if (this.previousOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOp = this.currentOp
        this.currentOp = ''

    }

    compute(){
        let calculation 
        const prev = parseFloat(this.previousOp)
        const cur = parseFloat(this.currentOp)
        if (isNaN(prev)|| isNaN(cur)) return
        switch (this.operation){
            case '+':
                calculation = prev + cur
                break
            case '-':
                calculation =prev - cur
                break
            case '*':
                calculation = prev * cur
                break
            case '/':
                calculation = prev / cur
                break
            default:
                return
        }
        this.currentOp = calculation
        this.operation = undefined
        this.previousOp = ''
    }

    getDisplay (number) {
        const stringNum = number.toString()
        const intNum = parseFloat(stringNum.split('.')[0])
        const decimal = stringNum.split('.')[1]
        let intDisplay
        if (isNaN(intNum)) {
          intDisplay = ''
        } else {
          intDisplay = intNum.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimal != null) {
          return `${intDisplay}.${decimal}`
        } else {
          return intDisplay
        }
    }

    updateDisplay(){
        this.currentText.innerText = this.getDisplay(this.currentOp)
        if(this.operation != null){
            this.previousText.innerText = 
            `${this.getDisplay(this.previousOp)} ${this.operation}`

        }
        else{
            this.previousText.innerText = ''
        }

    }
    
}
const numberBttn = document.querySelectorAll('.data-number')
const operationBttn = document.querySelectorAll('.data-operation')
const equalsBttn = document.querySelector('.equal')
const deleteBttn = document.querySelector('.delete')
const aClearBttn = document.querySelector('.all-clear')
const previousText = document.querySelector('.s-previous')
const currentText = document.querySelector('.s-current')
const calculator = new Calculator(previousText,currentText)

numberBttn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationBttn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsBttn.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})
aClearBttn.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteBttn.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})
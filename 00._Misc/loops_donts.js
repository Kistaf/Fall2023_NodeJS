/*
    Rules: Always use loop methods in modern JS.
    For loops are only used when figner counting is needed (counting to a number)
*/

const numbers = [1, 2, 3, 4]

/*
    Argument 1: Brevity
    Argument 2: Clarity (loop methods community intend)
    Argument 3: No accidental indexing errors (out of bounds)
*/
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i])
}

numbers.forEach(num => console.log(num))

/*
    Argument 4: number of/in numbers confusion
    Argument 5: not being able to access both element and index
    Argument 6: side effects
*/
let oddIndexSideEffect = []
let index = 0
for (number of numbers) {
    if (index % 2 === 1) {
        oddIndexSideEffect.push(Number(number))
    }
    index++
}
console.log(oddIndexSideEffect)

const oddNumbers = numbers.filter((_, index) => index % 2 === 1)
console.log(oddNumbers)

/* Argument 7: Don't mutate the original list */
for (index in numbers) {
    numbers[index] = numbers[index] * 2
}

const doubledList = numbers.map(number => number * 2)

console.log(numbers)
console.log(doubledList)

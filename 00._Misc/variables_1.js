const scheduledBreaktime = "15:00";
let consoleLogCounter = 0;
console.log(`Let's take a break at ${scheduledBreaktime}`);
consoleLogCounter++;

// String, Number, Boolean, Null, Undefined, BigInteger, Object, Symbol
// Object: Object, Array, Date

// type coercion
// Tries to interpret the types together and make something out of them
// 2 + "2" = "22"
// [] + [] = ""
// etc...

// 3 ways to make strings
console.log("This is the first way '''");
console.log('This is the second way """');
console.log(`This is the ${"third"} way """ '''`);

consoleLogCounter += 3;

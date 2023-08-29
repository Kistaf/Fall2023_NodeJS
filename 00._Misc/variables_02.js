// "use strict";
// restricts certain things from being used

totalGlobalVariable = "Never do this";
var globalVariable = "Never use var unless required";

// global scope

function anotherScope() {
  // function scope
}

{
  // block scope
}

{
  var someVariable = true;
  {
    var someVariable = false;
  }
  console.log(someVariable);
}

for (var i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

for (let j = 0; j <= 5; j++) {
  setTimeout(() => {
    console.log(j);
  }, 1000);
}

// const = the value is not constant, but we can't redeclare the reference.

// can't do this
// const test;

// can't do this
// const anotherTest = 123
// anotherTest = 456

const someArr = [];
someArr.push(1);

const someObj = {};
someObj.hello = "world";

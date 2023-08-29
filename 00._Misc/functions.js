// hoisting
console.log(getRandomInt());

// "standard" function
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// anonymous function
const getRandomIntAnonymousFunction = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

// arrow function
// hoisting does not apply to arrow functions,
// so they have to be initialized before you call them.
// Either imported or in some other way.
const getRandomIntArrowFunction = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomIntArrowFunctionWithoutReturn = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

const genericActionPerformer = (genericAction, name) => {
  return genericAction(name);
};

const jump = (name) => `${name} is jumping`;

console.log(genericActionPerformer(jump, "Lasse"));

// const run = (name) => `${name} is running`;
function run(name) {
  return `${name} is running`;
}
console.log(genericActionPerformer(run, "Jonathan"));

console.log(genericActionPerformer((name) => `${name} is sleeping`, "Daniel"));

"use strict";
/*
TS is statically typed superset of JS that compiles to plain JS. It adds features like
static typing(type of variable is known at compile time, not while the program is running)

VARIABLE DECLARATION KEYWORDS

TypeScript allows to declare variables using three keywords: var, let, and const.

1. var
var is function-scoped and can lead to unexpected behavior due to hoisting.
It’s accessible throughout the function in which it’s declared but has function-level scoping.

2. let
let provides block-level scoping, meaning it is confined to the block (i.e., loop or condition)
in which it is declared.

3. const
Similar to let in terms of scoping, const is used for variables that should not be reassigned
after their initial value. Attempting to reassign a const variable results in a compile-time error.

        Re declaration      Re assignment
- var        yes               yes
- let        no                yes
- const      no                no

*/
Object.defineProperty(exports, "__esModule", { value: true });
let namee = 'Amit';
const age = 25;
// age = 30; //not allowed
var num = 10;
// var num = 20; //re declaration - allowed in var
//functions
function greetUser(name, age) {
    return `Hello, ${name}! You are ${age} years old.`;
}
let greeting = greetUser("Prakriti", 21);
console.log(greeting);
//# sourceMappingURL=intro.js.map
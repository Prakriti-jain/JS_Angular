/*
    Module consists of exports and imports: it breaks code into logical pieces
    to make it more maintainable and reusable.
*/
// here i have imported and used teh delared functions and variables from exportt.ts

import {add,pi} from "./export.js"; // named import
import subtract from "./export.js"; // default import

// we can also rename imports using 'as' keyword
import {add as addition, pi as PI} from "./export.js";

console.log("Addition using named import: ", add(10, 20));
console.log("Subtraction using default import: ", subtract(30, 15));
console.log("Value of pi using named import: ", pi);
console.log("Addition using renamed import: ", addition(5, 7));
console.log("Value of pi using renamed import: ", PI);

// to import everything from a module
import * as mathu from "./export.js";
console.log("Addition using import * as : ", mathu.add(12, 8));
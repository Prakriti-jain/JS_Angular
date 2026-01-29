/*
-----------------------DATA TYPES -

PRIMITIVE DATA TYPES
Type	    Keyword	    Description
Number	    number	    Represents both integer and floating-point numbers.
String	    string	    Represents textual data.
Boolean	    boolean	    Represents logical values: true or false.
Null	    null	    Represents the intentional absence of any object value.
Undefined	undefined	Represents an uninitialized variable.
Symbol	    symbol	    Represents a unique, immutable value, often used as object keys.
BigInt	    bigint	    Represents integers with arbitrary precision.

*/
//Type Annotation in array
var list = [1, 2, 3];
console.log(list);
var list1 = [1, 2, 'Prakriti'];
console.log(list1);
//Type Annotation in Object
var person = {
    name: "Alice",
    age: 21
};
console.log(person);
// == and ====
// == compares values after type conversion and === compares both values and type without conversion
// in TS, using == for different data types is not allowed, for JS it can be done
// 5=="5" --> gives error in TS, works for JS
/*
OBJECT TYPES
Object types are more complex structures that can contain multiple values and functions.
They are mutable and can be manipulated after creation.

Type	      Description
Object	      Represents any non-primitive type
Array	      Represents a collection of elements of a specific type.
Tuple	      Represents an array with a fixed number of elements of specific types.
Enum	      Represents a set of named constants, allowing for a collection of related values.
Function	  Represents a callable entity; can define parameter and return types.
Class	      Defines a blueprint for creating objects with specific properties and methods.
Interface	  Describes the shape of an object, specifying property names and types.
*/
//----------------------ENUMS
// 1. Numeric Enums - each member of a numeric enum is assigned a numeric value, starting from 0
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
var move = Direction.Down;
console.log(move); //print 1 (by default), print 2 (when value of Up is set to 1)
//2. String Enums - allows to assign string values to each member
var Directions;
(function (Directions) {
    Directions["Up"] = "UP";
    Directions["Down"] = "DOWN";
    Directions["Left"] = "LEFT";
    Directions["Right"] = "RIGHT";
})(Directions || (Directions = {}));
var mov = Directions.Down;
console.log(mov);
function roll() {
    return 4;
    // return 7; // this will give error
}
var dir;
dir = "UP";
// dir = "hhsd" //will give error 
//---------------------UNION TYPE
//---------------------OBJECTS - collection of key value pairs
var User = {
    id: 1,
    name: "Prakriti",
    isActive: true
};
console.log(Object.keys(User));
//won't work as these methods were introduced in later versions
// console.log(Object.values(User));
// console.log(Object.entries(User));
//-----------------------ARRAYS
var nums = [1, 2, 3, 10, 23, 12];
var names = ["A", "B"];
var data = [1, "two"];
//array methods
nums.push(100); //to add at the last
nums.pop(); //to remove element from the last
// nums.splice(1, 3); //to remove from a range, this will remove elements from index 1 to index 3
var num = nums.slice(1, 3); //create a subarray from index 1 to index 2 (ending index excluded)
console.log(nums.reverse()); //reverse the original array only, use toReversed() in later types only
// console.log(nums.toReversed())
console.log(num);
//-----------------------TUPLES - fixed length array where each index has a fixed type
var order = [1, "watch", true];
order.push(1); //this would work as tuples are still arrays under hood, not a new runtime structure,
// for this readonly can be used (does not allow any modification), or use const
console.log(order);

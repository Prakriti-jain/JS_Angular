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
const list : number[] = [1, 2, 3];
console.log(list);

const list1 : (string|number)[] = [1, 2, 'Prakriti'];
console.log(list1);

//Type Annotation in Object
const person : {name : string , age : number} = {
    name : "Alice",
    age : 21
}

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


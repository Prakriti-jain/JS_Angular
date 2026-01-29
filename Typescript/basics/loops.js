//---------------------------LOOPS 
// --------for loop
for (var i_1 = 1; i_1 < 4; i_1++) {
    // console.log(i);
}
//---------while loop
var i = 0;
while (i < 5) {
    // console.log(i);
    i++;
}
//---------- do while loop
var j = 0;
do {
    // console.log(j);
    j++;
} while (j <= 0);
//----------- for of loop - used for arrays
var arr = [1, 2, 3, 4, 5];
for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var m = arr_1[_i];
    // console.log(m);
}
//---------- for in loop - used for objects(iterate over keys), for arrays (iterate over indexes)
var obj = {
    firstName: "Prakriti",
    lastName: "Jain",
    age: 21
};
// obj[key] TypeScript me fail hota hai kyunki key ka type string hota hai, 
// jo object ke specific keys ke saath safely match nahi karta; 
// isliye keyof typeof obj use karna padta hai.
for (var key in obj) {
    // console.log(obj[key as keyof typeof obj]);
}
//---------------for each - runs a function once for each element of an array (does not return anything)
/*
syntax

array.forEach((element, index, array) => {
    //logic
});
*/
var numarr = [1, 2, 6, 0, 8, 9];
numarr.forEach(function (n) { console.log(n); });
numarr.forEach(function (value, index) {
    console.log("value at index ".concat(index, " is ").concat(value));
});
//map, filter, reduce
//-----------------map() - har element ko transform karna
var squares = numarr.map(function (num) {
    return num * num;
});
console.log(squares);
var students = [
    { name: "A", marks: 10 },
    { name: "B", marks: 12 }
];
var names = students.map(function (stu) { return stu.name; });
console.log(names);
//----------------filter()
var nameFilter = students.filter(function (stu) { return (stu.marks > 10); });
console.log(nameFilter);
//---------------reduce() - sabko milake ek value banana (single number/object/string/array)
/*
syntax

array.reduce((accumulator, current) => {
  return updatedAccumulator;
}, initialValue);
*/
var sum = numarr.reduce(function (acc, curr) { return (acc + curr); }, 0);
console.log(sum);
//sum of marks
var totalMarks = students.reduce(function (acc, stu) { return (acc + stu.marks); }, 0);
console.log(totalMarks);

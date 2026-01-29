//---------------------------LOOPS 
// --------for loop
for(let i=1; i<4 ; i++) {
    // console.log(i);
}

//---------while loop
let i=0;
while(i<5) {
    // console.log(i);
    i++;
}

//---------- do while loop
let j = 0;
do {
    // console.log(j);
    j++;
} while(j<=0);

//----------- for of loop - used for arrays
let arr : number[] = [1, 2, 3, 4, 5];
for(let m of arr) {
    // console.log(m);
}

//---------- for in loop - used for objects(iterate over keys), for arrays (iterate over indexes)
let obj = {
    firstName: "Prakriti",
    lastName : "Jain",
    age : 21
}

// obj[key] TypeScript me fail hota hai kyunki key ka type string hota hai, 
// jo object ke specific keys ke saath safely match nahi karta; 
// isliye keyof typeof obj use karna padta hai.
for(let key in obj) {
    // console.log(obj[key as keyof typeof obj]);
}

//---------------for each - runs a function once for each element of an array (does not return anything)
/*
syntax

array.forEach((element, index, array) => {
    //logic
});
*/

const numarr : number[] = [1, 2, 6, 0, 8, 9];
numarr.forEach((n) => {console.log(n)});

numarr.forEach((value, index) => {
    console.log(`value at index ${index} is ${value}`);
})

//map, filter, reduce
//-----------------map() - har element ko transform karna
const squares = numarr.map((num) => {
    return num*num;
});

console.log(squares);

type Student = {
    name : string;
    marks : number
}

const students : Student[] = [
    {name : "A" , marks : 10},
    {name : "B", marks : 12}
];
const names = students.map((stu) => stu.name);
console.log(names);

//----------------filter()
const nameFilter = students.filter((stu) => (stu.marks>10));
console.log(nameFilter);

//---------------reduce() - sabko milake ek value banana (single number/object/string/array)
/*
syntax 

array.reduce((accumulator, current) => {
  return updatedAccumulator;
}, initialValue);
*/
 
const sum = numarr.reduce((acc, curr) => (acc+curr), 0);
console.log(sum);

//sum of marks
const totalMarks = students.reduce((acc, stu) => (acc + stu.marks), 0);
console.log(totalMarks);
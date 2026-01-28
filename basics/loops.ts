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

//----------do while loop
let j = 0;
do {
    // console.log(j);
    j++;
} while(j<=0);

//-----------for of loop - used for arrays
let arr : number[] = [1, 2, 3, 4, 5];
for(let m of arr) {
    // console.log(m);
}

//----------for in loop - used for objects
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
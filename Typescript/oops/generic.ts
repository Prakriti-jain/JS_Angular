//generic class
class Box<T> {
    constructor(public value: T) { }

    getValue(): T {
        return this.value;
    }
}

const b1 = new Box<number>(100);
const b2 = new Box<string>("TS");
console.log("Box 1 Value: ", b1.getValue());
console.log("Box 2 Value: ", b2.getValue());

//Generic Constraints 
//T koi bhi type ho sakta hai, bas condition ye hai ki uske paas length property honi chahiye (number type ki)
function printLength<T extends {length : number}>(item : T) {
    return item.length;
}

console.log(printLength([1, 2]));


//Multiple Generic types
function pair<K, V>(key: K, value: V) {
    return { key, value };
}
const paired = pair<string, number>("age", 25);
const pairednn = pair<number, number>(200, 25);
console.log("Paired Object: ", paired);
console.log("Paired Object with number key: ", pairednn);
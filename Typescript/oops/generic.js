//generic class
var Box = /** @class */ (function () {
    function Box(value) {
        this.value = value;
    }
    Box.prototype.getValue = function () {
        return this.value;
    };
    return Box;
}());
var b1 = new Box(100);
var b2 = new Box("TS");
console.log("Box 1 Value: ", b1.getValue());
console.log("Box 2 Value: ", b2.getValue());
//Generic Constraints 
//T koi bhi type ho sakta hai, bas condition ye hai ki uske paas length property honi chahiye (number type ki)
function printLength(item) {
    return item.length;
}
console.log(printLength([1, 2]));
//Multiple Generic types
function pair(key, value) {
    return { key: key, value: value };
}
var paired = pair("age", 25);
var pairednn = pair(200, 25);
console.log("Paired Object: ", paired);
console.log("Paired Object with number key: ", pairednn);

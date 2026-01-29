var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.introduce = function () {
        return "Hi, my name is ".concat(this.name, " and age is ").concat(this.age);
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    Person.prototype.setAge = function (age) {
        this.age = age;
    };
    return Person;
}());
var person1 = new Person("Alice", 25);
console.log(person1.introduce());
person1.setAge(20);
console.log(person1.introduce());
var Car = /** @class */ (function () {
    function Car(name, model) {
        this.name = name;
        this.model = model;
    }
    Car.prototype.work = function () {
        return "This car is working";
    };
    return Car;
}());
var myCar = new Car("toyota", "m3");
console.log(myCar.work());
//creating an object of interface Vehicle without implementing
var anotherCar = {
    name: "Bike",
    work: function () {
        return "I am bike";
    },
};
console.log(anotherCar.work());

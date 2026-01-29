class Person {
    //encapsulation - field made 
    public name:string;
    private age:number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    introduce() : string {
        return `Hi, my name is ${this.name} and age is ${this.age}`;
    }

    getAge() : number {
        return this.age;
    }

    setAge(age : number) {
        this.age = age;
    }
}

const person1 = new Person("Alice" , 25);
console.log(person1.introduce());
person1.setAge(20);
console.log(person1.introduce());

interface Vehicle {
    name : string;
    work() : string;
}

class Car implements Vehicle {
    name : string;
    model : string;
    
    constructor(name:string , model : string) {
        this.name = name;
        this.model = model;
    }

    work() {
        return "This car is working";
    }
}

const myCar = new Car("toyota", "m3");
console.log(myCar.work());

//creating an object of interface Vehicle without implementing
const anotherCar : Vehicle = {
    name : "Bike",
    work() {
        return "I am bike";
    },
}

console.log(anotherCar.work());
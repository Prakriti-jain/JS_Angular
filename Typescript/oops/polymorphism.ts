class Animal {
  sound() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  sound() {
    console.log("Bark");
  }
}

const a: Animal = new Dog();
a.sound(); // Bark

const b: Animal = new Animal();
b.sound(); 

const c: Dog = new Animal();
c.sound(); 


// Conversion Exercise
//o Write a function declaration called sayHello that takes a name and logs a greeting.
function sayHello(name){
    console.log("1. Greetings: ", name);
};

//o Convert sayHello into a function expression.
let greet = function sayHello(name){
    console.log("2. Greetings: ", name);
};

//o Finally, convert it into an arrow function. Make sure they all behave the same way.
const sayHello2 = (name) => console.log("3. Greetings2: ", name);

// 2. Scope Testing
//o Create a function that declares a let variable inside an if statement block. Attempt to log it
//outside the block. Observe the result.
const log = () => {
    if (2 === 2){
        let hi = 85;
    }
}
// console.log(hi)

//o Move the declaration so it works as expected.
let hi = 85;
const log1 = () => {
    if (2 === 2){
        hi = "rest"
    }
}
// console.log(hi)

//3. Math Functions
//o Write a function called calculateRectanglePerimeter that takes width and height, then returns
//the perimeter.
const calculateRectanglePerimeter = (width, height) => {
    let answer1 = 2* (width + height);
    return answer1;
}

//o Create another function called calculateCircleArea that takes a radius and returns the area
const calculateCircleArea = (radius) => {
    let area = Math.PI * radius * radius
    return area
}
//of a circle (π × radius²). You can use Math.PI for π.
//o Print the results to the console to confirm correctness.

/////// TESTS
sayHello("Bujwa")
greet("Bujwa")
sayHello2("Bujwa")
console.log(calculateRectanglePerimeter(2,2))
console.log(calculateCircleArea(7))

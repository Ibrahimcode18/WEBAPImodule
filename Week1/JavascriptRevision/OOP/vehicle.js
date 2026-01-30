export class Vehicle {
    constructor (name){
        this.name = name;
    };
    move (){
        console.log("Move your", this.name, "out of the way.");
    }
};

// bmw = new Vehicle("Bayer Motoren Werke")
// bmw.move()


class Car extends Vehicle{
    constructor (name, brand){
        super(name);
        this.brand = brand;
    }
    move2(){
        console.log("The", this.brand, "is moving.")
    }
}

const benz = new Car("GL50", "Mercedes Benz");
benz.move()
benz.move2()




// class Fruit{
//     constructor(name){
//         this.name = name;
//     }
//     color(){
//         console.log("The name of the fruit is", this.name);
//     }
// }

// apple = new Fruit("Apple");
// apple.color()

// class EliteTeams{
//     constructor(name,player1,player2,player3){
//         this.name = name;
//         this.player1 = player1;
//         this.player2 = player2;
//         this.player3 = player3
//     }

//     goalhighlight(){
//         console.log(this.name, "scored a crazy goal yesterday, this is how it happened", this.player1, "passed to", this.player2, ".", this.player2, "then crossed the ball beautifully to", this.player3, ".", this.player3, "then finished beautifully with a bicyle kick")
//     }
// }

// madrid = new EliteTeams("Real Madrid", "Modric", "Carvajal", "Ronaldo")
// madrid.goalhighlight()


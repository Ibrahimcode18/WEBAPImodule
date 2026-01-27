import {Vehicle} from './vehicle.js'

function Shape(color){
    this.color = color;
    this.talkcolor = function (){
        console.log("The color of this shape is", this.color);
    },
    this.rest = function(){
        console.log("Yes");
    }
};

function Square(length, color){
    Shape.call(this, color);
    this.length = length;
    this.talklength = function(){
        console.log("A square has", this.length, "and is color", this.color);
    }
};

const square1 = new Square(7, "brown");
square1.rest()

const vehicle1 = new Vehicle("Bulldog");
vehicle1.move();
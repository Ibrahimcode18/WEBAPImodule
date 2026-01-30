// Create an array of at least five items.
const randomitems = ["Orange", 45, "Apple", 56, "Mango"];

//Print the first and last item to the console.
console.log(randomitems[0],randomitems.at(-1));

//Remove the first item, then add a new item at the end.
randomitems.shift()
console.log(randomitems)

randomitems.push("Bicycle")
//Print the updated array.
console.log(randomitems)

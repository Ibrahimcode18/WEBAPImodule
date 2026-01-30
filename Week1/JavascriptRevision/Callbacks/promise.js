// file: fetchExample.js
const fyy = require("fs").promises;
fyy.readFile("example.txt", "utf8")
    .then(data => {
        console.log("Who dey breath: ", data);
    }).catch(err => {
        console.log("Error: ", error)
    })
console.log("Picke me first");


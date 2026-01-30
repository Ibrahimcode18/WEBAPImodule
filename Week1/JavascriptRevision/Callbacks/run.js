// file: readFileCallback.js
const fs = require("fs");
// Asynchronous file read with a callback
fs.readFile("example.txt", "utf8", (err, data) => {
 if (err) {
 console.error("Error reading file:", err);
 return;
 }
 console.log("File contents:", data);
});
console.log("This will log before the file read completes.");
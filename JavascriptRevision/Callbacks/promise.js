// file: fetchExample.js
const fyy = require("fs").promises;
async function getData() {
 try {
 const data = await fyy.readFile("example.txt", "utf8");
 console.log("Post data:", data);
 } catch (error) {
 console.error("Error fetching data:", error);
 }
}
getData();
console.log("Fetching data in the background...");
async function getData() {
 try {
 const data = await fetch("https://jsonplaceholder.typicode.com/posts/1");
 const response = await data.json();
 console.log("Post data:", response);
 } catch (error) {
 console.error("Error fetching data:", error);
 }
}
getData();
console.log("Fetching data in the background...");
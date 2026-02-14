const mysql = require('mysql2/promise');
const { config } = require('./config');

async function checkoutBook(bookId) {
 const connection = await mysql.createConnection(config);
 // Update the 'isAvailable' flag
 const sql = "UPDATE books SET isAvailable = false WHERE ID = ?";

 // We pass the ID we want to change
 const [result] = await connection.execute(sql, [bookId]);
 if (result.affectedRows > 0) {
 console.log(`Success: Book ID ${bookId} has been checked out.`);
 } else {
 console.log(`Error: Book ID ${bookId} not found.`);
 }
 await connection.end();
}
// Let's checkout Book ID 2 (1984)
checkoutBook(2);
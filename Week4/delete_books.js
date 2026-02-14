const mysql = require('mysql2/promise');
const { config } = require('./config');

async function removeBook(bookId) {
    const connection = await mysql.createConnection(config);
    const sql = "DELETE FROM books WHERE ID = ?";

    const [result] = await connection.execute(sql, [bookId]);
    if (result.affectedRows > 0) {
    console.log(`Success: Book ID ${bookId} deleted.`);
    } else {
    console.log("Error: Book not found.");
    }
    await connection.end();
    }
// Delete Book ID 3
removeBook(3);
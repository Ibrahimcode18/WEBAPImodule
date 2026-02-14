const mysql = require('mysql2/promise');
const { config } = require('./config');

async function addBooks() {
try {
    const connection = await mysql.createConnection(config);
    // 1. The SQL Query
    // We use ? as placeholders for security
    const sql = `INSERT INTO books (title, author, yearPublished) VALUES (?, ?, ?)`;
    // 2. The Data
    const book1 = ['The Hobbit', 'J.R.R. Tolkien', 1937];
    const book2 = ['1984', 'George Orwell', 1949];
    const book3 = ['The Great Gatsby', 'F. Scott Fitzgerald', 1925];
    // 3. Execute
    await connection.execute(sql, book1);
    await connection.execute(sql, book2);
    await connection.execute(sql, book3);
    console.log("Success: Added 3 books to the library.");
    await connection.end();
    } catch (error) {
        console.error("Error:", error);
    }
}
addBooks();
const mysql = require('mysql2/promise');
const { config } = require('./config');

async function listBooks() {
    const connection = await mysql.createConnection(config);
    // Get everything
    const [rows] = await connection.execute('SELECT * FROM books');

    console.log("--- CURRENT LIBRARY INVENTORY ---");
    // console.table is a neat trick to print JSON as a grid
    console.table(rows);
    await connection.end();
}
listBooks();
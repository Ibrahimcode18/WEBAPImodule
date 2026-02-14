const mysql = require('mysql2/promise');
const { config } = require('./config');

const command = process.argv[2]; // The first argument (e.g. 'list')
const arg1 = process.argv[3]; // The second argument (e.g. Title or ID)
const arg2 = process.argv[4]; // Author
const arg3 = process.argv[5]; // Year

async function run() {
    const connection = await mysql.createConnection(config);
    if (command === 'list') {
        const [rows] = await connection.execute('SELECT * FROM books');
        console.table(rows);
    }
    else if (command === 'add') {
        // TODO: Implement the INSERT logic here using arg1, arg2, arg3
        const query = `INSERT INTO books (title, author, yearPublished) Values(?, ?, ?)`;
        await connection.execute(query, [arg1, arg2, arg3]);
        console.log(`Adding book: ${arg1}...`);
    }
    else if (command === 'delete') {
        // TODO: Implement DELETE logic here using arg1 (which is the ID)
        const query = `DELETE FROM books WHERE ID = ?`;
        const [result] = await connection.execute(query, [arg1]);
        if (result.affectedRows > 0) {
            console.log(`Success: Book ID ${arg1} deleted.`);
        } else {
            console.log("Error: Book not found.");
        }
        await connection.end();
    }
    else {
        console.log("Unknown command. Try 'list', 'add', or 'delete'.");
    }
    await connection.end();
}
run();
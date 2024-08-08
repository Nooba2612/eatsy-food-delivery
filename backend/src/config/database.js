const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();

const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// Create the connection to database
const connection = mysql.createConnection({
    database: dbName,
    host: dbHost,
    user: dbUser,
    password: dbPassword,
});

// Connect to the database
const connectToDatabase = () => {
    connection.connect((error) => {
        if (err) {
            console.error("\n\nError connecting to the database:", error.stack);
            return;
        }
        console.log("\n\nConnected to the database.");
    });
};

const getTableDataBySQL = (sql, values) => {
    connection.execute(sql, values, (err, rows, fields) => {
        if (err instanceof Error) {
            console.log(err);
            return;
        }

        console.log(rows);
        console.log(fields);
    });
};

module.exports = { connectToDatabase, connection };

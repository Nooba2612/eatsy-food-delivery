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
    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to the database:", err.stack);
            return;
        }
        console.log("Connected to the database.");
    });
};

const logDB = () => {
    connection.query("SELECT * FROM `Users` ", (err, results, fields) => {
        console.log(results[0]);
    });
};
// logDB();

module.exports = { connectToDatabase, connection };

const mysql = require("mysql2");

const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// Create the connection to database
const connection = mysql.createConnection({
    database: dbName || "eatsy_food_delivery",
    host: dbHost || "localhost",
    user: dbUser || "nooba",
    password: dbPassword || "noobanecon",
});

// Connect to the database
const connectToDatabase = () => {
    connection.connect((error) => {
        if (error) {
            console.error("\n\nError connecting to the database:", error.stack);
            return;
        }
        console.log("\n\nConnected to the database.");
    });
};

module.exports = { connectToDatabase, connection };

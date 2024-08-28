const { Sequelize } = require("sequelize");

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("\n\nConnection to database has been established successfully.\n\n");
    } catch (error) {
        console.error("\n\nUnable to connect to the database:", error + "\n\n");
    }
};

module.exports = {
    sequelize,
    connectToDatabase,
};

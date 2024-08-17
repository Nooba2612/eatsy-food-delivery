const { connection } = require("@config/database");

const getUser = async (phoneNumber) => {
    try {
        const sql = `SELECT * FROM USERS WHERE phone = '${phoneNumber}'`;
        return new Promise((resolve, reject) => {
            connection.execute(sql, [phoneNumber], (err, rows) => {
                if (err) {
                    console.log("\n\nDatabase error: ", err);
                    reject(err);
                    return;
                }

                if (rows.length === 0) {
                    console.log("\n\nUser not found");
                    resolve(null);
                } else {
                    resolve(rows[0]);
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (phone, password) => {
    const sql = `INSERT INTO Users (phone, password) VALUES ('${phone}', '${password}')`;

    try {
        return new Promise((resolve, reject) => {
            connection.execute(sql, [phone, password], (err) => {
                if (err) {
                    console.log("\n\nAdd user to database failed\n\n", err);
                    reject(err);
                    return;
                }

                resolve(true);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async () => {};

const deleteUser = async () => {};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
